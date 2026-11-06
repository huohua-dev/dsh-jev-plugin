/** Original task facts, budget priority, and checkpoint replay for interjection classification. */
import { afterEach, describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import SessionStore, { SessionLogOffset } from '@deepseek-ai/dsh-session'
import SessionProjectionRegistry from '@deepseek-ai/dsh-session-projection'
import { createAssistantMessage, createSystemMessage, createUserMessage, ToolCallId } from '@deepseek-ai/dsh-llm'
import { routingContextProjection, selectRoutingContext } from '../src/interjection-context.ts'

const cleanups: Array<() => Promise<void>> = []
afterEach(async () => { for (const cleanup of cleanups.splice(0).reverse()) await cleanup() })
const user = (text: string) => createUserMessage({ source: { kind: 'user' }, content: [{ type: 'text', text }] })

async function setup(budget = 12000) {
  const ctx = new Context()
  await ctx.plugin(SessionStore)
  await ctx.plugin(SessionProjectionRegistry)
  cleanups.push(() => ctx.fiber.dispose())
  const definition = routingContextProjection(budget)
  const handle = await ctx.sessionProjections.register(definition)
  const session = ctx.sessions.create()
  session.append('turn/start', { turn: 1 })
  session.append('step/start', { turn: 1, step: 1 })
  session.append('system/message', { turn: 1, step: 1, message: createSystemMessage('fixture') }, { surfaceOp: 'append' })
  return { ctx, session, definition, handle }
}

function textSize(input: ReturnType<typeof selectRoutingContext>): number {
  return [...input.taskMessages, ...input.previousTask, ...input.goal === null ? [] : [input.goal], ...input.recentAssistant === null ? [] : [input.recentAssistant]]
    .reduce((total, item) => total + item.text.length, 0) + (input.recentTool?.name.length ?? 0)
}

describe('bounded original routing context', () => {
  it('keeps original user requirements ahead of long assistant output and shares one budget', async () => {
    const h = await setup(80)
    const original = user('Fix the login failure.')
    const amended = user('Discuss before editing.')
    h.session.append('user/message', original, { surfaceOp: 'append' })
    h.session.append('user/message', amended, { surfaceOp: 'append' })
    h.session.append('assistant/message', { turn: 1, step: 1, message: createAssistantMessage({
      source: { provider: 'fixture', model: 'fixture' }, content: [{ type: 'text', text: 'Large assistant output '.repeat(100) }],
    }) }, { surfaceOp: 'append' })
    const input = selectRoutingContext(h.handle.stateOf(h.session), [], { id: 'goal-id', objective: 'Make login work.' }, 'model-response')
    expect(input.taskMessages).toEqual([
      { id: original.id, text: 'Fix the login failure.', excerpt: false },
      { id: amended.id, text: 'Discuss before editing.', excerpt: false },
    ])
    expect(input.goal?.id).toBe('goal-id')
    expect(input.contextTruncated).toBe(true)
    expect(textSize(input)).toBeLessThanOrEqual(80)
    expect(input.activity).toBe('model-response')
  })

  it('uses existing text and tool metadata without arguments, reasoning or tool results', async () => {
    const h = await setup()
    const original = user('Inspect the Jev repository.')
    h.session.append('user/message', original, { surfaceOp: 'append' })
    h.session.append('assistant/message', { turn: 1, step: 1, message: createAssistantMessage({
      source: { provider: 'fixture', model: 'fixture' }, content: [
        { type: 'reasoning', text: 'Hidden planning must not be sent.' },
        { type: 'text', text: 'I will read interjection.ts.' },
      ],
    }) }, { surfaceOp: 'append' })
    const callId = ToolCallId('read-one')
    h.session.append('tool/call', { turn: 1, step: 1, callId, name: 'read', arguments: '{"path":"packages/jev/src/interjection.ts"}' })
    const input = selectRoutingContext(h.handle.stateOf(h.session), [], undefined, 'tool-execution')
    expect(input.recentAssistant?.text).toBe('I will read interjection.ts.')
    expect(input.recentTool).toEqual({ callId, name: 'read', excerpt: false, status: 'running' })
    expect(JSON.stringify(input)).not.toContain('Hidden planning')
  })

  it.each([
    ['JSON', JSON.stringify({ command: 'curl -H "Authorization: Bearer dummy-bearer-secret"', password: 'dummy-password-secret' })],
    ['escaped JSON', String.raw`{"command":"curl -H \"Authorization: Bearer dummy-bearer-\u0073ecret\"","password":"dummy-password-\u0073ecret"}`],
    ['incomplete JSON', '{"command":"Bearer dummy-bearer-secret", "password":"dummy-password-secret'],
  ])('omits all %s tool arguments from projection, checkpoints and routing context', async (_format, args) => {
    const h = await setup()
    h.session.append('user/message', user('Inspect the service.'), { surfaceOp: 'append' })
    const callId = ToolCallId('secret-command')
    h.session.append('tool/call', { turn: 1, step: 1, callId, name: 'bash', arguments: args })
    const state = h.handle.stateOf(h.session)
    const input = selectRoutingContext(state, [], undefined, 'tool-execution')
    const checkpoint = h.ctx.sessionProjections.checkpoint(h.session)
    const expected = { callId, name: 'bash', excerpt: false, status: 'running' }
    expect(state.tool).toEqual(expected)
    expect(input.recentTool).toEqual(expected)
    for (const value of [state, input, checkpoint]) {
      const serialized = JSON.stringify(value)
      expect(serialized).not.toContain('arguments')
      expect(serialized).not.toContain('Authorization')
      expect(serialized).not.toContain('Bearer')
      expect(serialized).not.toContain('dummy-bearer-')
      expect(serialized).not.toContain('password')
    }
    // The security boundary is the auxiliary routing material, not the original Session.
    expect(h.session.snapshotEvents().some(event => event.type === 'tool/call' && event.data.arguments === args)).toBe(true)
  })

  it('selects only tool metadata even if an input object has an extra arguments field', async () => {
    const h = await setup()
    const state = {
      ...h.handle.stateOf(h.session),
      tool: { callId: 'legacy-call', name: 'bash', excerpt: false, status: 'running' as const,
        arguments: '{"password":"dummy-password-secret"}' },
    }
    const input = selectRoutingContext(state, [], undefined, 'tool-execution')
    expect(input.recentTool).toEqual({ callId: 'legacy-call', name: 'bash', excerpt: false, status: 'running' })
    expect(JSON.stringify(input)).not.toContain('arguments')
    expect(JSON.stringify(input)).not.toContain('dummy-password-secret')
  })

  it('invalidates argument-bearing checkpoints from the previous projection version', async () => {
    const h = await setup(80)
    await h.handle.dispose()
    const legacy = await h.ctx.sessionProjections.register({ ...h.definition, stateVersion: 1_000_001 + 80 })
    const callId = ToolCallId('legacy-call')
    h.session.append('tool/call', { turn: 1, step: 1, callId, name: 'bash', arguments: '{"password":"dummy-password-secret"}' })
    const checkpoint = h.ctx.sessionProjections.checkpoint(h.session)
    const entry = checkpoint['jev-interjection-context']!
    const legacyCheckpoint = { ...checkpoint, 'jev-interjection-context': { ...entry, val: {
      ...legacy.stateOf(h.session), tool: { callId, name: 'bash', excerpt: false, status: 'running' as const,
        arguments: '{"password":"dummy-password-secret"}' },
    } } }
    await legacy.dispose()
    const current = await h.ctx.sessionProjections.register(routingContextProjection(80))
    expect(h.ctx.sessionProjections.restoreFloor(legacyCheckpoint)).toBe(0)
    const replay = h.ctx.sessionProjections.restore(legacyCheckpoint, h.session.snapshotEvents(), SessionLogOffset(0), h.session.header, SessionLogOffset(0))
    expect(replay.checkpoint['jev-interjection-context']?.val).toEqual(current.stateOf(h.session))
    expect(JSON.stringify(replay.checkpoint)).not.toContain('arguments')
    expect(JSON.stringify(replay.checkpoint)).not.toContain('dummy-password-secret')
  })

  it('includes a claimed but not yet admitted original exactly once', async () => {
    const h = await setup()
    const original = user('Only discuss the change.')
    const proposed = selectRoutingContext(h.handle.stateOf(h.session), [original], undefined, 'other')
    expect(proposed.taskMessages.map(item => item.id)).toEqual([original.id])
    h.session.append('user/message', original, { surfaceOp: 'append' })
    const admitted = selectRoutingContext(h.handle.stateOf(h.session), [original], undefined, 'model-response')
    expect(admitted.taskMessages).toEqual(proposed.taskMessages)
  })

  it('retains only bounded recent amendments and marks omitted task material', async () => {
    const h = await setup(30)
    const original = user('Original task')
    h.session.append('user/message', original, { surfaceOp: 'append' })
    for (let index = 0; index < 50; index++) h.session.append('user/message', user('Change ' + index + ' requires discussion'), { surfaceOp: 'append' })
    const state = h.handle.stateOf(h.session)
    expect(state.users[0]?.id).toBe(original.id)
    expect(state.users.map(item => item.text).join('').length).toBeLessThanOrEqual(60)
    const input = selectRoutingContext(state, [], undefined, 'other')
    expect(input.taskMessages.at(-1)?.text).toContain('Change 49')
    expect(input.contextTruncated).toBe(true)
    expect(textSize(input)).toBeLessThanOrEqual(30)
  })

  it('replays a checkpoint suffix to the same bounded materials as the live projection', async () => {
    const h = await setup(80)
    h.session.append('user/message', user('Original task'), { surfaceOp: 'append' })
    const checkpoint = h.ctx.sessionProjections.checkpoint(h.session)
    h.session.append('user/message', user('Correct the current target'), { surfaceOp: 'append' })
    const floor = h.ctx.sessionProjections.restoreFloor(checkpoint)!
    const replay = h.ctx.sessionProjections.restore(checkpoint, h.session.snapshotEvents(floor), floor, h.session.header, SessionLogOffset(0))
    expect(replay.checkpoint['jev-interjection-context']?.val).toEqual(h.handle.stateOf(h.session))
    const fresh = h.ctx.sessionProjections.restore({}, h.session.snapshotEvents(), SessionLogOffset(0), h.session.header, SessionLogOffset(0))
    expect(fresh.checkpoint['jev-interjection-context']?.val).toEqual(h.handle.stateOf(h.session))
  })

  it('invalidates a checkpoint when the configured context budget changes', async () => {
    const h = await setup(30)
    h.session.append('user/message', user('A task with original details that exceed thirty characters.'), { surfaceOp: 'append' })
    const checkpoint = h.ctx.sessionProjections.checkpoint(h.session)
    await h.handle.dispose()
    const larger = await h.ctx.sessionProjections.register(routingContextProjection(100))
    expect(h.ctx.sessionProjections.restoreFloor(checkpoint)).toBe(0)
    const replay = h.ctx.sessionProjections.restore(checkpoint, h.session.snapshotEvents(), SessionLogOffset(0), h.session.header, SessionLogOffset(0))
    expect(replay.checkpoint['jev-interjection-context']?.val).toEqual(larger.stateOf(h.session))
    expect(larger.stateOf(h.session).users[0]?.excerpt).toBe(false)
  })
})
