import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { createVolatile, updateVolatile } from '@deepseek-ai/cosmokit'
import { agentEvents, type Agent } from '@deepseek-ai/dsh-agent'
import { mountAgentLoopTestDependencies, mountAgentLoopTestHarness } from '@deepseek-ai/dsh-agent-loop-testkit'
import { createUserMessage, ToolCallId, type UserMessage } from '@deepseek-ai/dsh-llm'
import { SessionId } from '@deepseek-ai/dsh-session'
import { PtcRuntime, type PtcRunRequest, type PtcRunSpec, type PtcRunResult } from '@deepseek-ai/dsh-ptc-runtime'
import { defineTool, type ToolPresentationMode } from '@deepseek-ai/dsh-tools'
import { apply, Config, isMcpPublicName } from '../src/mcp-selection.ts'
import { MCP_SELECTION_DEFAULTS } from '../src/mcp-selection-types.ts'
import type { JevJudgeOnceOptions, JevJudgeOnceResult } from '../src/index.ts'
import type { JevRequest } from '../src/types.ts'

const cleanups: Array<() => Promise<void>> = []
afterEach(async () => { for (const cleanup of cleanups.splice(0).reverse()) await cleanup() })
const user = (text: string) => createUserMessage({ source: { kind: 'user' }, content: [{ type: 'text', text }] })
const A = 'mcp__burp__alpha'
const B = 'mcp__burp__beta'
class Runtime extends PtcRuntime {
  readonly language = 'typescript'
  readonly isolation = 'test'
  resolve(request: PtcRunRequest): PtcRunSpec { return { ...request, cwd: request.cwd ?? process.cwd(), timeoutMs: 1000 } }
  async run(): Promise<PtcRunResult> { return { logs: [], value: null } }
}
async function fixture(mode: ToolPresentationMode = 'native') {
  const ctx = new Context()
  cleanups.push(async () => { await ctx.fiber.dispose() })
  await mountAgentLoopTestDependencies(ctx, { tools: { mode } })
  if (mode !== 'native') await ctx.plugin(Runtime)
  const harness = await mountAgentLoopTestHarness(ctx)
  ctx.provide('settings', { configure: () => () => {} } as never)
  let on = true
  let listener: (() => void) | undefined
  const requests: JevRequest[] = []
  const scores: Record<string, number> = { [A]: 0.1, [B]: 0.9 }
  const judge = vi.fn(async (options: JevJudgeOnceOptions): Promise<JevJudgeOnceResult> => {
    const request = await options.refresh(options.signal!)
    requests.push(request)
    const candidates = (request.state as { candidates: { name: string }[] }).candidates
    return { kind: 'ok', operationId: `op-${requests.length}`, attemptId: 'attempt', response: {
      answers: candidates.map((tool, i) => ({ id: `tool-${i}`, kind: 'noul', probability: scores[tool.name] ?? 0.9 })),
    } }
  })
  const receipt = vi.fn(async () => {})
  ctx.provide('jev', { registerFeature: () => () => {}, isFeatureEnabled: () => on,
    onFeatureStateChange: (value: () => void) => { listener = value; return () => { listener = undefined } },
    judgeOnce: judge, writeReceipt: receipt,
  } as never)
  const config = {
    toolLimit: createVolatile(1), minProbability: createVolatile(0.5), allowZero: createVolatile(true),
    pinnedTools: createVolatile<string[]>([]), waitMs: createVolatile(1000), maxRequestChars: createVolatile(48000),
  }
  apply(ctx, config)
  const executed = vi.fn(async () => 'ok')
  const register = (name: string, description = name) => ctx.tools.register(defineTool({ name, description,
    parameters: {}, output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] }, execute: executed }))
  const removeA = register(A)
  register(B)
  register('read')
  const agent = await harness.create(SessionId('one'))
  let sequence = 0
  const invoke = (name: string, args: object = {}, target = agent) => ctx.agents.withInitiator(target, () => ctx.tools.execute({
    name, arguments: args, callId: ToolCallId(`call-${++sequence}`), signal: new AbortController().signal, agent: target,
  }))
  const assemble = (target = agent, signal = new AbortController().signal) => ctx.systemPrompt.assemble({ scope: target, agent: target, signal })
  const step = async (pending: UserMessage[] = [], target = agent) => {
    for (const message of pending) agentEvents(ctx, target).emit('agent/inbox/claimed', { message, turn: 1 })
    const assembly = await assemble(target)
    const decision = await agentEvents(ctx, target).waterfall('agent/pre-step', {
      messages: pending, turn: 1, step: 1, signal: new AbortController().signal,
    }, () => Promise.resolve({ kind: 'enter' as const, messages: pending }))
    if (decision.kind === 'enter') for (const message of decision.messages) target.session.append('user/message', message, { surfaceOp: 'append' })
    return assembly
  }
  return { ctx, harness, agent, config, scores, requests, judge, receipt, register, executed, removeA, assemble, invoke, step,
    enabled: (value: boolean) => { on = value; listener?.() } }
}
const names = (assembly: { tools: { name: string }[] }) => assembly.tools.map(tool => tool.name)
const change = <T>(value: ReturnType<typeof createVolatile<T>>, next: T) => updateVolatile(value, createVolatile(next))

describe('native MCP definition selection through public hooks', () => {
  it('validates settings and does not parse normalized names into server/raw identities', () => {
    expect(Config({} as never).toolLimit.get()).toBe(MCP_SELECTION_DEFAULTS.toolLimit)
    for (const values of [{ toolLimit: -1 }, { minProbability: 1.1 }, { waitMs: 0 }, { pinnedTools: ['mcp__*'] }]) expect(() => Config(values as never)).toThrow()
    expect(isMcpPublicName('mcp__server__with__underscores__raw_name_123456789abc')).toBe(true)
    expect(isMcpPublicName('mcp__server__tool.with.dot')).toBe(false)
    expect(isMcpPublicName('mcp__s__' + 'x'.repeat(64))).toBe(false)
  })
  it('uses claimed first-turn text, filters only MCP, caches ordinary steps and records a Session notice', async () => {
    const f = await fixture()
    const first = await f.step([user('inspect beta')])
    expect(names(first)).toEqual(expect.arrayContaining([B, 'read', 'mcp_catalog', 'mcp_load']))
    expect(names(first)).not.toContain(A)
    expect(JSON.stringify(f.requests[0])).toContain('inspect beta')
    expect(f.requests).toHaveLength(1)
    await f.step()
    expect(f.requests).toHaveLength(1)
    expect(f.agent.session.deriveMessages().filter(m => m.role === 'user' && m.source.kind === 'jev-mcp-selection')).toHaveLength(1)
    expect(f.receipt.mock.calls[0]?.[1]).toMatchObject({ status: 'observed' })
    // Hiding definitions is deliberately not an execution policy.
    expect((await f.invoke(A)).isError).toBe(false)
  })
  it('offers paginated discovery and adds omitted definitions only on next assembly without Jev', async () => {
    const f = await fixture()
    const first = await f.step([user('inspect beta')])
    const catalog = await f.invoke('mcp_catalog', { limit: 1 })
    expect(catalog.isError).toBe(false)
    if (catalog.isError) return
    expect(JSON.parse(String(catalog.value))).toMatchObject({ total: 2, nextOffset: 1, tools: [{ name: A }] })
    const loaded = await f.invoke('mcp_load', { names: [A] })
    expect(loaded.isError).toBe(false)
    expect(names(first)).not.toContain(A)
    expect(names(await f.step())).toContain(A)
    expect(f.requests).toHaveLength(1)
    expect(f.executed).not.toHaveBeenCalled()
    await f.step([user('new task')])
    expect(names(await f.step())).not.toContain(A)
    expect(f.requests).toHaveLength(2)
  })
  it('supports zero choice, pins beyond budget, and opt-out of zero', async () => {
    const f = await fixture()
    f.scores[B] = 0.2
    expect(names(await f.step([user('unrelated task')])).filter(isMcpPublicName)).toEqual([])
    change(f.config.pinnedTools, [A, 'mcp__absent__name'])
    expect(names(await f.step()).filter(isMcpPublicName)).toEqual([A])
    change(f.config.pinnedTools, [])
    change(f.config.allowZero, false)
    expect(names(await f.step()).filter(isMcpPublicName)).toEqual([B])
    change(f.config.toolLimit, 0)
    expect(names(await f.step()).filter(isMcpPublicName)).toEqual([A, B]) // invalid combination fails open
    change(f.config.allowZero, true)
    expect(names(await f.step()).filter(isMcpPublicName)).toEqual([])
  })
  it('reselects for same-text new message identity, schema changes and registry generations', async () => {
    const f = await fixture()
    await f.step([user('same text')])
    await f.step([user('same text')])
    expect(f.requests).toHaveLength(2)
    f.removeA(); f.register(A, 'changed description and schema generation')
    await f.step()
    expect(f.requests).toHaveLength(3)
    expect(JSON.stringify(f.requests[2])).toContain('changed description')
  })
  it('isolates caches and manual loads by Agent; disabling restores and clears loads', async () => {
    const f = await fixture()
    const second = await f.harness.create(SessionId('two'))
    const message = user('same task')
    await f.step([message])
    await f.step([message], second)
    expect(f.requests).toHaveLength(2)
    await f.invoke('mcp_load', { names: [A] })
    expect(names(await f.step())).toContain(A)
    expect(names(await f.step([], second))).not.toContain(A)
    f.enabled(false)
    const off = names(await f.step())
    expect(off.filter(isMcpPublicName)).toEqual([A, B])
    expect(off).not.toContain('mcp_catalog')
    expect(off).not.toContain('mcp_load')
    const inactive = await f.invoke('mcp_load', { names: [A] })
    expect(JSON.stringify(inactive)).toContain('inactive')
    f.enabled(true)
    expect(names(await f.step())).not.toContain(A)
    expect(f.requests).toHaveLength(3)
  })
  it.each(['failed', 'malformed', 'throws', 'receipt'])('falls back and caches %s without repeating paid attempts', async mode => {
    const f = await fixture()
    if (mode === 'failed') f.judge.mockResolvedValue({ kind: 'failed', failure: { code: 'NETWORK', message: 'offline' } })
    if (mode === 'malformed') f.judge.mockResolvedValue({ kind: 'ok', operationId: 'bad', attemptId: 'bad', response: { answers: [] } })
    if (mode === 'throws') f.judge.mockRejectedValue(new Error('storage unavailable'))
    if (mode === 'receipt') f.receipt.mockRejectedValue(new Error('write failed'))
    const fallback = names(await f.step([user('task')]))
    expect(fallback.filter(isMcpPublicName)).toEqual([A, B])
    expect(fallback.some(name => name === 'mcp_catalog' || name === 'mcp_load')).toBe(false)
    await f.step()
    expect(f.judge).toHaveBeenCalledTimes(1)
  })
  it('aborts timed-out judge without human retry and caches fallback', async () => {
    const f = await fixture()
    change(f.config.waitMs, 10)
    f.judge.mockImplementation(options => new Promise(resolve => options.signal!.addEventListener('abort', () => resolve({ kind: 'cancelled', operationId: 'timed-out' }), { once: true })))
    expect(names(await f.step([user('task')])).filter(isMcpPublicName)).toEqual([A, B])
    await f.step()
    expect(f.judge).toHaveBeenCalledTimes(1)
    expect(f.receipt).not.toHaveBeenCalled()
  })
  it('rejects stale answers when disabled or directory changes while waiting', async () => {
    const f = await fixture()
    const started = Promise.withResolvers<void>()
    const released = Promise.withResolvers<void>()
    const original = f.judge.getMockImplementation()!
    f.judge.mockImplementation(async options => { started.resolve(); await released.promise; return original(options) })
    const pending = f.step([user('task')])
    await started.promise
    f.register('mcp__burp__new')
    f.enabled(false)
    released.resolve()
    expect(names(await pending).filter(isMcpPublicName)).toEqual([A, B])
  })
  it('does not widen scoped restrictions, guards, or other assembly filters through pins/load', async () => {
    const f = await fixture()
    const restore = f.agent.ctx.tools.restrict({ deny: [A] })
    change(f.config.pinnedTools, [A])
    expect(names(await f.step([user('task')]))).not.toContain(A)
    expect(JSON.stringify(await f.invoke('mcp_catalog'))).not.toContain('"name":"' + A + '"')
    expect(JSON.stringify(await f.invoke('mcp_load', { names: [A] }))).toContain('rejected')
    expect((await f.invoke(A)).isError).toBe(true)
    restore()
    f.ctx.tools.guard(exec => exec.name === A ? 'original permission denied' : undefined)
    await f.step()
    await f.invoke('mcp_load', { names: [A] })
    expect(names(await f.step())).toContain(A)
    expect((await f.invoke(A)).isError).toBe(true)
    f.ctx.on('system-prompt/assemble', async (_assembly, _context, next) => {
      const result = await next(); return { ...result, tools: result.tools.filter(tool => tool.name !== A) }
    })
    expect(names(await f.step())).not.toContain(A)
    expect(JSON.stringify(await f.invoke('mcp_load', { names: [A] }))).toContain('rejected')
    expect(f.executed).not.toHaveBeenCalled()
  })
  it('fails open when recovery tool is restricted, context absent or request exceeds budget', async () => {
    const f = await fixture()
    expect(names(await f.step()).filter(isMcpPublicName)).toEqual([A, B])
    const restore = f.agent.ctx.tools.restrict({ deny: ['mcp_load'] })
    expect(names(await f.step([user('task')])).filter(isMcpPublicName)).toEqual([A, B])
    restore()
    f.register('mcp__burp__huge', 'x'.repeat(3000))
    change(f.config.maxRequestChars, 2048)
    expect(names(await f.step()).filter(isMcpPublicName)).toHaveLength(3)
    expect(f.judge).not.toHaveBeenCalled()
  })
  it('restores the pre-Jev tool set when later pre-step policy changes the admitted user', async () => {
    const f = await fixture()
    f.ctx.on('agent/pre-step', async (_payload, next) => {
      const decision = await next()
      return decision.kind === 'enter' ? { ...decision, messages: [user('rewritten task')] } : decision
    })
    const result = await f.step([user('initial task')])
    expect(names(result).filter(isMcpPublicName)).toEqual([A, B])
    expect(f.agent.session.deriveMessages().some(m => m.role === 'user' && m.source.kind === 'jev-mcp-selection')).toBe(false)
  })
  it.each(['ptc', 'both'] as const)('keeps %s wire definitions and SDK unchanged without Jev', async mode => {
    const f = await fixture(mode)
    f.enabled(false)
    const baseline = await f.assemble()
    f.enabled(true)
    const actual = await f.step([user('task')])
    expect(actual.tools).toEqual(baseline.tools)
    expect(actual.sections).toEqual(baseline.sections)
    expect(actual.sections.find(section => section.name === 'tools:sdk')?.text).toContain(A)
    expect(f.judge).not.toHaveBeenCalled()
  })
})
