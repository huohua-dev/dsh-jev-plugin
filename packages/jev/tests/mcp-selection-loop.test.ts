/** Offline integration against the published DSH AgentLoop, not fabricated hook events or Agents. */
import { createServer } from 'node:http'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import AgentLoop from '@deepseek-ai/dsh-agent-loop'
import { mountAgentLoopTestDependencies } from '@deepseek-ai/dsh-agent-loop-testkit'
import LocalFileSystem from '@deepseek-ai/dsh-fs-local'
import { createUserMessage, LlmAdapter, ToolCallId, type GenerateOptions, type StreamChunk, type ToolSchema } from '@deepseek-ai/dsh-llm'
import { PtcRuntime, type PtcRunRequest, type PtcRunResult, type PtcRunSpec } from '@deepseek-ai/dsh-ptc-runtime'
import { SessionId } from '@deepseek-ai/dsh-session'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { JsonStorageBackend } from '@deepseek-ai/dsh-storage-json'
import { defineTool } from '@deepseek-ai/dsh-tools'
import UserQuestions from '@deepseek-ai/dsh-user-questions'
import ApprovalService from '@deepseek-ai/dsh-user-approval'
import JevService from '../src/index.ts'
import * as mcpSelection from '../src/mcp-selection.ts'

type ToolPresentationMode = 'native' | 'ptc'

const SELECTED = 'mcp__fixture__search'
const OMITTED = 'mcp__fixture__fetch'
const UNRELATED = 'mcp__fixture__calendar'
const MCP_NAMES = [SELECTED, OMITTED, UNRELATED]
const user = (text: string) => createUserMessage({ source: { kind: 'user' }, content: [{ type: 'text', text }] })
const names = (tools: readonly ToolSchema[] | undefined) => (tools ?? []).map(tool => tool.name)
const text = (value: string): StreamChunk[] => [
  { type: 'block-start', index: 0, blockType: 'text' },
  { type: 'block-end', index: 0, block: { type: 'text', text: value } },
  { type: 'finish', reason: { kind: 'stop' } },
]
const call = (id: string, name: string, args: object = {}): StreamChunk[] => [
  { type: 'block-start', index: 0, blockType: 'tool-call' },
  { type: 'block-end', index: 0, block: { type: 'tool-call', id: ToolCallId(id), name, arguments: JSON.stringify(args) } },
  { type: 'finish', reason: { kind: 'tool-calls' } },
]
class Model extends LlmAdapter {
  readonly requests: GenerateOptions[] = []
  constructor(private readonly script: StreamChunk[][]) { super() }
  async *stream(request: GenerateOptions): AsyncIterable<StreamChunk> {
    this.requests.push(request)
    const reply = this.script.shift()
    if (!reply) throw new Error('MCP integration model script exhausted')
    yield* reply
  }
}
/** Supplies only the public language contract needed by the real PTC/both presenter. */
class UnusedPtcRuntime extends PtcRuntime {
  readonly language = 'typescript'
  readonly isolation = 'test'
  resolve(request: PtcRunRequest): PtcRunSpec {
    return { ...request, cwd: request.cwd ?? process.cwd(), timeoutMs: request.timeoutMs ?? 1000 }
  }
  async run(_request: PtcRunRequest): Promise<PtcRunResult> {
    throw new Error('These presentation-only tests must never execute PTC code')
  }
}
interface Wire {
  state: {
    context: { role: 'user'; text: string }[]
  }
  questions: Record<string, { type: string; instructions: string }>
}
const cleanups: Array<() => Promise<void>> = []
afterEach(async () => {
  const failures: unknown[] = []
  for (const cleanup of cleanups.splice(0).reverse()) {
    try { await cleanup() } catch (error) { failures.push(error) }
  }
  vi.restoreAllMocks()
  if (failures.length) throw new AggregateError(failures, 'MCP integration cleanup failed')
})

async function fixture(script: StreamChunk[][], options: {
  enabled?: boolean
  mountSelection?: boolean
  mode?: ToolPresentationMode
  fault?: 'http' | 'malformed'
} = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'jev-mcp-loop-'))
  // The cleanup target is exactly the temporary directory returned above, never a user path.
  if (resolve(dir) !== dir || !dir.startsWith(join(tmpdir(), 'jev-mcp-loop-'))) throw new Error('Unexpected fixture directory')
  cleanups.push(() => rm(dir, { recursive: true, force: true }))
  const requests: Wire[] = []
  const duringHttp: { visibleUsers: string[]; mainRequests: number }[] = []
  let observe = () => ({ visibleUsers: [] as string[], mainRequests: 0 })
  const server = createServer(async (request, response) => {
    const chunks: Buffer[] = []
    for await (const chunk of request) chunks.push(Buffer.from(chunk))
    const wire = JSON.parse(Buffer.concat(chunks).toString()) as Wire
    requests.push(wire)
    duringHttp.push(observe())
    // Each question names the tool it rates; the fixture scores by that text, never by position.
    const answers = Object.fromEntries(Object.entries(wire.questions).map(([id, question]) => [id,
      { noul: question.instructions.includes(`Tool: ${SELECTED}.`) ? 0.95 : 0.05 }]))
    response.writeHead(options.fault === 'http' ? 503 : 200, { 'content-type': 'application/json' })
    response.end(JSON.stringify({ answers: options.fault === 'malformed' ? {} : answers }))
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  cleanups.push(async () => {
    server.closeAllConnections()
    await new Promise<void>(resolve => server.close(() => resolve()))
  })
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Fixture requires a loopback TCP port')
  const ctx = new Context()
  cleanups.push(async () => { await ctx.fiber.dispose() })
  await mountAgentLoopTestDependencies(ctx, { tools: { mode: options.mode ?? 'native' } })
  if (options.mode && options.mode !== 'native') await ctx.plugin(UnusedPtcRuntime)
  await ctx.plugin(LocalFileSystem, { cwd: dir })
  await ctx.plugin(Storage)
  await ctx.plugin(UserQuestions)
  await ctx.plugin(AgentLoop, { agents: [] })
  const backend = new JsonStorageBackend(join(dir, 'storage'))
  const unregister = ctx.storage.backend.register('json', backend)
  const facility = new DomainFacility(ctx, { backend: 'json' })
  ctx.provide('storageDomain', facility)
  // Dispose consumers before closing their storage; teardown runs in reverse order.
  cleanups.pop()
  cleanups.push(async () => {
    await ctx.fiber.dispose()
    unregister()
    await facility.closeAll()
    await backend.close()
  })
  ctx.provide('profileContext', { dir: join(dir, 'profile') } as never)
  ctx.provide('settings', { configure: () => () => {} } as never)
  ctx.provide('credentials', { resolve: async () => ({ value: 'localhost-only-dummy', source: 'fixture' }) } as never)
  await ctx.plugin(JevService, {
    baseUrl: `http://127.0.0.1:${address.port}/v1/systemone`, model: 'offline-fixture',
    credentialRef: 'FIXTURE_ONLY', timeoutMs: 5000,
    features: options.enabled ? { 'mcp-selection': true } : {},
  })
  if (options.mountSelection !== false) await ctx.plugin(mcpSelection, { toolLimit: 1, minProbability: 0.5, waitMs: 5000 })
  const executions: string[] = []
  for (const name of [...MCP_NAMES, 'probe']) {
    ctx.tools.register(defineTool({
      name, description: `Offline fixture ${name}; no MCP server is connected`, parameters: {},
      output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] },
      execute: async () => { executions.push(name); return `fixture executed ${name}` },
    }))
  }
  const model = new Model(script)
  ctx.llm.registerAdapter(['mcp-loop-fixture'], model)
  const errors: unknown[] = []
  const asks: unknown[] = []
  ctx.on('agent/error', ({ error }) => { errors.push(error) })
  ctx.on('user-questions/request', async request => {
    asks.push(request)
    return { answers: [{ id: 'jev-resolution', selected: ['取消 / Cancel'] }] }
  })
  const agent = await ctx.agentLoop.create(SessionId('mcp-selection-loop'),
    { provider: 'mcp-loop-fixture', model: 'scripted' }, { cwd: dir })
  observe = () => ({
    visibleUsers: agent.session.deriveMessages().filter(message => message.role === 'user' && message.source.kind === 'user').map(message => message.id),
    mainRequests: model.requests.length,
  })
  return {
    ctx, agent, model, requests, duringHttp, executions, errors, asks,
    records: () => ctx.jev.listRecords({ sessionId: agent.session.id, limit: 100 }),
    headers: () => agent.session.snapshotEvents().filter(event => event.type === 'request/header'),
    run: async (prompt: string) => { agent.followup(user(prompt)); await agent.whenIdle() },
  }
}

describe('MCP selection compatibility with the published provider-owned Host (offline)', () => {
  it('leaves definitions and Session headers intact with selection enabled, without paid judgments or helpers', async () => {
    const h = await fixture([call('original', OMITTED), text('Original tool executed')], { enabled: true })
    await h.run('Find the document and fetch its body')
    expect(h.errors).toEqual([])
    expect(h.asks).toEqual([])
    expect(h.requests).toEqual([])
    expect((await h.records()).items).toEqual([])
    expect(await h.ctx.jev.listFeatures()).toMatchObject([{
      id: 'mcp-selection', enabled: true, description: expect.stringContaining('Unavailable on this Host'),
    }])
    expect(h.model.requests).toHaveLength(2)
    for (const request of h.model.requests) expect(names(request.tools)).toEqual([...MCP_NAMES, 'probe'].sort())
    expect(h.headers()).toHaveLength(1)
    expect(h.headers()[0]!.data.header.tools).toEqual(h.model.requests[0]!.tools)
    expect(h.executions).toEqual([OMITTED])
    expect(h.ctx.tools.get('mcp_catalog', h.agent)).toBeUndefined()
    expect(h.ctx.tools.get('mcp_load', h.agent)).toBeUndefined()
    expect(h.agent.session.deriveMessages().some(message => message.role === 'user' && message.source.kind === 'jev-mcp-selection')).toBe(false)
  })

  it('keeps the unmounted and default-disabled Host views identical', async () => {
    const unmounted = await fixture([text('Unmodified host')], { mountSelection: false, enabled: true })
    await unmounted.run('Find a document')
    expect(await unmounted.ctx.jev.listFeatures()).toEqual([])
    const disabled = await fixture([text('Original answer')])
    await disabled.run('Find a document')
    expect(await disabled.ctx.jev.listFeatures()).toMatchObject([{ id: 'mcp-selection', enabled: false }])
    expect(disabled.requests).toEqual([])
    expect(disabled.errors).toEqual([])
    expect(unmounted.errors).toEqual([])
    expect(disabled.model.requests[0]!.tools).toEqual(unmounted.model.requests[0]!.tools)
  })

  it('preserves scoped visibility, conditional admission, and native execution guards', async () => {
    const h = await fixture([call('guarded', SELECTED), text('Guard retained')], { enabled: true })
    h.agent.ctx.tools.restrict({ deny: [OMITTED] })
    h.ctx.tools.guard(exec => exec.name === SELECTED ? 'fixture permission denied' : undefined)
    h.ctx.tools.register(defineTool({ name: 'mcp__fixture__conditional', description: 'Not admitted', parameters: {},
      output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] },
      execute: async () => { throw new Error('Inactive tool must not execute') },
    }), { when: () => false })
    await h.run('Find a document')
    expect(h.errors).toEqual([])
    expect(h.executions).toEqual([])
    expect(h.requests).toEqual([])
    expect(names(h.model.requests[0]!.tools)).toEqual([UNRELATED, SELECTED, 'probe'].sort())
    const results = h.agent.session.snapshotEvents().filter(event => event.type === 'tool/result')
    expect(results).toHaveLength(1)
    expect(results[0]!.data.message.isError).toBe(true)
    expect(JSON.stringify(results[0]!.data.message)).toContain('fixture permission denied')
  })

  it('delegates asks to the original native approval flow without granting permission', async () => {
    const h = await fixture([call('ask', SELECTED), text('No approval bypass')], { enabled: true })
    await h.ctx.plugin(ApprovalService, { policy: 'ask' })
    const approvals: unknown[] = []
    h.ctx.on('tools/pre-execute', (exec, next) => exec.name === SELECTED
      ? Promise.resolve({ kind: 'ask' as const, reason: 'fixture requires approval' }) : next())
    h.ctx.on('approval/request', async request => { approvals.push(request); return 'rejected' as const })
    await h.run('Find a document')
    expect(h.errors).toEqual([])
    expect(approvals).toHaveLength(1)
    expect(h.requests).toEqual([])
    expect(h.executions).toEqual([])
    expect(h.agent.session.snapshotEvents().filter(event => event.type === 'tool/result')[0]!.data.message.isError).toBe(true)
  })

  it('preserves the real PTC wire definitions and SDK without recovery-helper leakage', async () => {
    const h = await fixture([text('Original PTC presentation preserved')], { enabled: true, mode: 'ptc' })
    await h.run('Find and fetch a document')
    expect(h.errors).toEqual([])
    expect(h.asks).toEqual([])
    expect(h.requests).toEqual([])
    expect((await h.records()).items).toEqual([])
    expect(h.model.requests).toHaveLength(1)
    const tools = names(h.model.requests[0]!.tools)
    expect(tools).toContain('run_code')
    for (const name of MCP_NAMES) {
      expect(tools).not.toContain(name)
      expect(JSON.stringify(h.model.requests[0]!.messages)).toContain(name)
    }
    expect(JSON.stringify(h.model.requests[0]!.messages)).not.toContain('mcp_catalog')
    expect(JSON.stringify(h.model.requests[0]!.messages)).not.toContain('mcp_load')
    expect(h.headers()[0]!.data.header.tools).toEqual(h.model.requests[0]!.tools)
    expect(h.executions).toEqual([])
  })
})
