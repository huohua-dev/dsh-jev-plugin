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
import { defineTool, type ToolPresentationMode } from '@deepseek-ai/dsh-tools'
import UserQuestions from '@deepseek-ai/dsh-user-questions'
import JevService from '../src/index.ts'
import * as mcpSelection from '../src/mcp-selection.ts'

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
    candidates: { name: string; description: string }[]
    policy: { toolLimit: number; presentationOnly: boolean }
  }
  questions: Record<string, { type: string }>
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
    const answers = Object.fromEntries(Object.keys(wire.questions).map((id, index) => [id,
      { noul: wire.state.candidates[index]?.name === SELECTED ? 0.95 : 0.05 }]))
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

describe('native MCP selection through the published AgentLoop (offline)', () => {
  it('judges the first claimed input during assembly, recovers omissions next step, caches, and records actual Session evidence', async () => {
    const h = await fixture([
      call('catalog', 'mcp_catalog', { query: 'fetch' }),
      call('load', 'mcp_load', { names: [OMITTED] }),
      call('recovered-tool', OMITTED),
      text('Recovered definition executed through the original tool pipeline.'),
    ], { enabled: true })
    const promptText = 'Find the document and fetch its complete body: first-turn-sentinel.'
    const prompt = user(promptText)
    expect(h.agent.session.deriveMessages()).toEqual([])
    h.agent.followup(prompt)
    await h.agent.whenIdle()
    expect(h.errors).toEqual([])
    expect(h.asks).toEqual([])
    expect(h.requests).toHaveLength(1)
    expect(h.requests[0]!.state.context).toEqual([{ role: 'user', text: promptText }])
    expect(h.duringHttp).toEqual([{ visibleUsers: [], mainRequests: 0 }])
    expect(h.requests[0]!.state.candidates.map(candidate => candidate.name)).toEqual([...MCP_NAMES].sort())
    expect(h.requests[0]!.state.policy).toMatchObject({ toolLimit: 1, presentationOnly: true })
    expect(Object.values(h.requests[0]!.questions).every(question => question.type === 'noul')).toBe(true)
    expect(h.model.requests).toHaveLength(4)
    const schemas = h.model.requests.map(request => names(request.tools))
    expect(schemas.slice(0, 2)).toEqual(Array.from({ length: 2 }, () => [SELECTED, 'mcp_catalog', 'mcp_load', 'probe']))
    expect(schemas.slice(2)).toEqual(Array.from({ length: 2 }, () => [OMITTED, SELECTED, 'mcp_catalog', 'mcp_load', 'probe']))
    expect(h.executions).toEqual([OMITTED]) // catalog/load never execute or connect an MCP service
    expect(JSON.stringify(h.model.requests[1]!.messages)).toContain(OMITTED)
    expect(JSON.stringify(h.model.requests[2]!.messages)).toContain('Queued for the next model request')
    expect(h.agent.session.deriveMessages().filter(message => message.id === prompt.id)).toHaveLength(1)
    const notices = h.agent.session.deriveMessages().filter(message => message.role === 'user' && message.source.kind === 'jev-mcp-selection')
    expect(notices).toHaveLength(2) // initial selection and the changed explicit-load set, not every step
    const headers = h.headers()
    expect(headers).toHaveLength(2)
    expect(headers[0]!.data.header.tools).toEqual(h.model.requests[0]!.tools)
    expect(headers[1]!.data.header.tools).toEqual(h.model.requests[2]!.tools)
    expect(h.agent.session.requestHeader()?.tools).toEqual(h.model.requests[3]!.tools)
    const results = h.agent.session.snapshotEvents().filter(event => event.type === 'tool/result')
    expect(results).toHaveLength(3)
    expect(results.every(event => !event.data.message.isError)).toBe(true)
    expect(JSON.stringify(results[0]!.data.message)).toContain(OMITTED)
    expect(JSON.stringify(results[1]!.data.message)).toContain('loaded')
    expect(JSON.stringify(results[1]!.data.message)).toContain(OMITTED)
    const records = await h.records()
    expect(records.items).toHaveLength(1)
    const record = await h.ctx.jev.getRecord(records.items[0]!.id)
    expect(record).toMatchObject({ featureId: 'mcp-selection', status: 'succeeded', attempts: 1 })
    expect(record?.attemptRecords).toHaveLength(1)
    expect(record?.attemptRecords[0]?.request.state).toEqual(h.requests[0]!.state)
    expect(record?.attemptRecords[0]?.response?.answers).toHaveLength(MCP_NAMES.length)
    expect(record?.receipts).toHaveLength(1)
    expect(record?.receipts[0]).toMatchObject({ id: 'mcp-definition-proposal', status: 'observed' })
    expect(JSON.parse(record!.receipts[0]!.reason!)).toMatchObject({
      mode: 'native', stage: 'assembly-proposal', selected: [SELECTED], fallback: false, modelReceived: 'unconfirmed',
    })
  })

  it('requires its independent module entry and stays disabled with default feature settings', async () => {
    const unmounted = await fixture([text('Unmodified host')], { mountSelection: false, enabled: true })
    await unmounted.run('Find and fetch a document')
    expect(await unmounted.ctx.jev.listFeatures()).toEqual([])
    expect(names(unmounted.model.requests[0]!.tools)).toEqual([...MCP_NAMES, 'probe'].sort())
    expect(unmounted.requests).toHaveLength(0)
    expect(unmounted.errors).toEqual([])
    const disabled = await fixture([call('original', OMITTED), text('Original tool still works')])
    await disabled.run('Find and fetch a document')
    expect(await disabled.ctx.jev.listFeatures()).toMatchObject([{ id: 'mcp-selection', enabled: false }])
    expect(disabled.requests).toHaveLength(0)
    expect((await disabled.records()).items).toEqual([])
    // Recovery helpers are hidden while the feature is off: the request equals the unmounted Host view.
    expect(names(disabled.model.requests[0]!.tools)).toEqual([...MCP_NAMES, 'probe'].sort())
    expect(disabled.executions).toEqual([OMITTED])
    expect(disabled.errors).toEqual([])
    expect(disabled.asks).toEqual([])
    expect(disabled.agent.session.deriveMessages().some(message => message.role === 'user' && message.source.kind === 'jev-mcp-selection')).toBe(false)
  })

  it.each(['http', 'malformed'] as const)('fails open once for %s faults without a model barrier or repeated judgment', async fault => {
    const h = await fixture([call('original', OMITTED), text('Original answer after judge failure')], { enabled: true, fault })
    await h.run('Find and fetch a document')
    expect(h.errors).toEqual([])
    expect(h.asks).toEqual([])
    expect(h.requests).toHaveLength(1)
    expect(h.model.requests).toHaveLength(2)
    for (const request of h.model.requests) expect(names(request.tools)).toEqual([...MCP_NAMES, 'probe'].sort())
    expect(h.executions).toEqual([OMITTED])
    expect(h.headers()).toHaveLength(1)
    expect(h.headers()[0]!.data.header.tools).toEqual(h.model.requests[0]!.tools)
    const records = await h.records()
    expect(records.items).toHaveLength(1)
    const record = await h.ctx.jev.getRecord(records.items[0]!.id)
    expect(record).toMatchObject({ featureId: 'mcp-selection', status: 'failed', attempts: 1 })
    // The real ledger allows action receipts only for succeeded judgments.
    expect(record?.receipts).toEqual([])
    expect(h.agent.session.deriveMessages().some(message => message.role === 'user' && message.source.kind === 'jev-mcp-selection')).toBe(false)
  })

  it.each(['ptc', 'both'] as const)('bypasses selection under the real %s presentation without connecting a service', async mode => {
    const h = await fixture([text('Original presentation preserved')], { enabled: true, mode })
    await h.run('Find and fetch a document')
    expect(h.errors).toEqual([])
    expect(h.asks).toEqual([])
    expect(h.requests).toHaveLength(0)
    expect((await h.records()).items).toEqual([])
    expect(h.model.requests).toHaveLength(1)
    const tools = names(h.model.requests[0]!.tools)
    expect(tools).toContain('run_code')
    for (const name of MCP_NAMES) {
      if (mode === 'both') expect(tools).toContain(name)
      else expect(tools).not.toContain(name)
      expect(JSON.stringify(h.model.requests[0]!.messages)).toContain(name) // real generated tools:sdk
    }
    expect(h.headers()[0]!.data.header.tools).toEqual(h.model.requests[0]!.tools)
    expect(h.executions).toEqual([])
  })
})
