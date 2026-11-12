import { expect, it } from 'vitest'
import type { Context } from '@deepseek-ai/cordis'
import type { Agent } from '@deepseek-ai/dsh-agent'
import { isLiveRoot, liveRootOf, liveRoots } from '../src/agent-roots.ts'

const agent = (id: string, origin?: 'subagent'): Agent => ({ id, session: { header: { origin } } }) as unknown as Agent

interface Fake {
  /** Agents the registry currently lists, in registration order. */
  live: Agent[]
  /** Hosts through 0.2.2-rc.1 list roots on the registry; later Hosts removed the method. */
  roots?: () => Agent[]
  /** The subagent service as `ctx.get('subagents')` returns it; absent when the Host mounts none. */
  tree?: { rootOf?: (agent: Agent) => Agent }
}

function context(fake: Fake): Context {
  const agents: Record<string, unknown> = {
    get: (id: string) => fake.live.find(item => item.id === id),
    list: () => [...fake.live],
  }
  if (fake.roots !== undefined) agents.roots = fake.roots
  return { agents, get: (name: string) => name === 'subagents' ? fake.tree : undefined } as unknown as Context
}

const failure = (code: string) => Object.assign(new Error(code), { code })

it('uses the registry roots() on Hosts that still provide it, without asking the subagent service', () => {
  const root = agent('root')
  const child = agent('child', 'subagent')
  const ctx = context({
    live: [root, child],
    roots: () => [root],
    tree: { rootOf: () => { throw new Error('the subagent service must not be consulted') } },
  })
  expect(isLiveRoot(ctx, root)).toBe(true)
  expect(isLiveRoot(ctx, child)).toBe(false)
  expect(liveRoots(ctx)).toEqual([root])
})

it('asks the subagent service which Agent leads a tree once the registry stops listing roots', () => {
  const first = agent('first')
  const child = agent('child', 'subagent')
  const second = agent('second')
  const ctx = context({
    live: [first, child, second],
    tree: { rootOf: member => member.id === 'child' ? first : member },
  })
  expect(isLiveRoot(ctx, first)).toBe(true)
  expect(isLiveRoot(ctx, second)).toBe(true)
  expect(isLiveRoot(ctx, child)).toBe(false)
  expect(liveRoots(ctx)).toEqual([first, second])
})

it('does not treat a delegated Agent whose tree has no active owner as a root', () => {
  const orphan = agent('orphan', 'subagent')
  const ctx = context({ live: [orphan], tree: { rootOf: () => { throw failure('UNAUTHORIZED') } } })
  expect(isLiveRoot(ctx, orphan)).toBe(false)
  expect(liveRoots(ctx)).toEqual([])
})

it('fails closed while the subagent service has no manager', () => {
  const ordinary = agent('ordinary')
  const delegated = agent('delegated', 'subagent')
  const ctx = context({ live: [ordinary, delegated], tree: { rootOf: () => { throw failure('CONTINUATION_UNAVAILABLE') } } })
  expect(isLiveRoot(ctx, ordinary)).toBe(false)
  expect(isLiveRoot(ctx, delegated)).toBe(false)
  expect(liveRoots(ctx)).toEqual([])
})

it('fails closed on a Host with neither seam', () => {
  const ordinary = agent('ordinary')
  const delegated = agent('delegated', 'subagent')
  const noService = context({ live: [ordinary, delegated] })
  expect(isLiveRoot(noService, ordinary)).toBe(false)
  expect(isLiveRoot(noService, delegated)).toBe(false)
  const noQuery = context({ live: [ordinary, delegated], tree: {} })
  expect(isLiveRoot(noQuery, ordinary)).toBe(false)
  expect(isLiveRoot(noQuery, delegated)).toBe(false)
})

it('accepts only the registry instance itself, never a stale or missing one', () => {
  const live = agent('same')
  const stale = agent('same')
  const gone = agent('gone')
  for (const ctx of [
    context({ live: [live], roots: () => [live] }),
    context({ live: [live], tree: { rootOf: member => member } }),
  ]) {
    expect(isLiveRoot(ctx, live)).toBe(true)
    expect(isLiveRoot(ctx, stale)).toBe(false)
    expect(isLiveRoot(ctx, gone)).toBe(false)
    expect(isLiveRoot(ctx, undefined)).toBe(false)
  }
})

it('returns a fresh array that callers may mutate', () => {
  const root = agent('root')
  for (const ctx of [
    context({ live: [root], roots: () => [root] }),
    context({ live: [root], tree: { rootOf: member => member } }),
  ]) {
    liveRoots(ctx).length = 0
    expect(liveRoots(ctx)).toEqual([root])
  }
})

function withParent(member: Agent, parent: Agent): Agent {
  Object.assign(member.session.header, { parentSession: parent.id })
  return member
}

it('resolves a managed grandchild despite an offline intermediate creator', () => {
  const root = agent('root')
  const offline = withParent(agent('offline', 'subagent'), root)
  const child = withParent(agent('child', 'subagent'), offline)
  const ctx = context({ live: [root, child], tree: { rootOf: () => root } })
  expect(liveRootOf(ctx, child)).toBe(root)
  expect(isLiveRoot(ctx, child)).toBe(false)
})

it('never falls back to durable lineage after the modern query rejects ownership', () => {
  const replacement = agent('root')
  const orphan = withParent(agent('child', 'subagent'), replacement)
  const ctx = context({ live: [replacement, orphan], tree: { rootOf: () => { throw failure('UNAUTHORIZED') } } })
  expect(liveRootOf(ctx, orphan)).toBeUndefined()
})

it('rejects a stale returned root and a stale input instance', () => {
  const stale = agent('root')
  const replacement = agent('root')
  const child = agent('child', 'subagent')
  const ctx = context({ live: [replacement, child], tree: { rootOf: () => stale } })
  expect(liveRootOf(ctx, child)).toBeUndefined()
  expect(liveRootOf(ctx, stale)).toBeUndefined()
})

it('preserves legacy shared-findings ancestry and terminates cycles', () => {
  const root = agent('root')
  const child = withParent(agent('child', 'subagent'), root)
  const ctx = context({ live: [root, child], roots: () => [root] })
  expect(liveRootOf(ctx, child)).toBe(root)
  withParent(child, child)
  expect(liveRootOf(ctx, child)).toBeUndefined()
})

it('keeps an ordinary fork independent despite a durable parent', () => {
  const parent = agent('parent')
  const fork = withParent(agent('fork'), parent)
  const ctx = context({ live: [parent, fork], tree: { rootOf: member => member } })
  expect(liveRootOf(ctx, fork)).toBe(fork)
  expect(isLiveRoot(ctx, fork)).toBe(true)
})
