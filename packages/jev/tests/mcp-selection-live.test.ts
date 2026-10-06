/**
 * Opt-in measurement against the real Jev endpoint. Skipped unless JEV_LIVE=1 and JEV_API_KEY are both set,
 * so the default suite never needs credentials or spends money. Each case sends one judgment; the catalog is a
 * fixed set of synthetic definitions and no MCP server is started. The key is read only from the environment and
 * is never printed or written.
 *
 *   JEV_LIVE=1 JEV_API_KEY=… node node_modules/vitest/vitest.mjs run packages/jev/tests/mcp-selection-live.test.ts
 */
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { mountAgentLoopTestDependencies, mountAgentLoopTestHarness } from '@deepseek-ai/dsh-agent-loop-testkit'
import { createUserMessage, type UserMessage } from '@deepseek-ai/dsh-llm'
import { SessionId } from '@deepseek-ai/dsh-session'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { JsonStorageBackend } from '@deepseek-ai/dsh-storage-json'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { agentEvents } from '@deepseek-ai/dsh-agent'
import UserQuestions from '@deepseek-ai/dsh-user-questions'
import JevService from '../src/index.ts'
import * as mcpSelection from '../src/mcp-selection.ts'

const live = process.env.JEV_LIVE === '1' && Boolean(process.env.JEV_API_KEY)
const BASE_URL = process.env.JEV_BASE_URL ?? 'https://api.typesafe.ai/v1/systemone'
const MODEL = process.env.JEV_MODEL ?? 'jev-1.13.0'

/** [server, rawName, description] — a mixed catalog of four synthetic servers. */
const CATALOG: readonly (readonly [string, string, string])[] = [
  ['burpsuite', 'proxy_history', 'Get Burp proxy history with optional filtering by URL, method, status code'],
  ['burpsuite', 'proxy_detail', 'Get full request/response details for a specific proxy history item by index'],
  ['burpsuite', 'search_history', 'Search proxy history with regex (in URL, request, or response)'],
  ['burpsuite', 'repeater_send', 'Send a request and get response (like Repeater)'],
  ['burpsuite', 'repeater_modify_send', 'Modify headers/body of a request then send it'],
  ['burpsuite', 'send_to_repeater', 'Send a raw request to Burp Repeater tab'],
  ['burpsuite', 'send_to_intruder', 'Send a request to Burp Intruder'],
  ['burpsuite', 'intruder_attack', 'Run a numeric range brute force attack (synchronous)'],
  ['burpsuite', 'intruder_attack_wordlist', 'Run a wordlist-based attack'],
  ['burpsuite', 'intruder_cluster_bomb', 'Run a Cluster Bomb attack (cartesian product multi-param)'],
  ['burpsuite', 'intruder_pitchfork', 'Run a Pitchfork attack (parallel multi-param)'],
  ['burpsuite', 'race_condition', 'Race condition testing'],
  ['burpsuite', 'access_control_sweep', 'Test different auth levels'],
  ['burpsuite', 'jwt_decode', 'Decode JWT tokens'],
  ['burpsuite', 'jwt_attack', 'JWT attacks (alg:none)'],
  ['burpsuite', 'generate_csrf_poc', 'Generate a CSRF proof-of-concept HTML page'],
  ['burpsuite', 'injection_probe', 'SQLi/SSTI/LFI probe'],
  ['burpsuite', 'collaborator_generate', 'Generate Burp Collaborator payloads for OOB testing'],
  ['burpsuite', 'collaborator_poll', 'Poll for Collaborator interactions (DNS/HTTP callbacks)'],
  ['burpsuite', 'scan_active', 'Start active scan on a specific request'],
  ['burpsuite', 'scan_results', 'Get scan results (discovered vulnerabilities)'],
  ['burpsuite', 'sitemap', 'Get site map entries with optional URL prefix filter'],
  ['burpsuite', 'crawl', 'Start crawling a URL (adds to scope)'],
  ['burpsuite', 'add_to_scope', 'Add a URL to Burp scope'],
  ['burpsuite', 'cookie_jar', 'View cookies in Burp cookie jar (with optional domain filter)'],
  ['burpsuite', 'encode', 'Encode a string (base64, url, hex)'],
  ['burpsuite', 'decode', 'Decode a string (base64, url)'],
  ['burpsuite', 'websocket_create', 'Create WebSocket connection'],
  ['burpsuite', 'websocket_send_text', 'Send text on WebSocket'],
  ['burpsuite', 'passive_intel', 'Extract secrets from proxy history'],
  ['burpsuite', 'intercept_toggle', 'Enable or disable proxy intercept'],
  ['burpsuite', 'export_request', 'Export a request as curl command'],
  ['github', 'create_issue', 'Create a new issue in a GitHub repository'],
  ['github', 'list_pull_requests', 'List pull requests in a GitHub repository'],
  ['github', 'get_pull_request', 'Get details of a specific GitHub pull request'],
  ['github', 'create_pull_request', 'Open a new pull request on GitHub'],
  ['github', 'search_code', 'Search code across GitHub repositories'],
  ['github', 'get_file_contents', 'Get the contents of a file in a GitHub repository'],
  ['github', 'list_commits', 'List commits on a GitHub branch'],
  ['github', 'add_issue_comment', 'Add a comment to a GitHub issue or pull request'],
  ['postgres', 'query', 'Run a read-only SQL query against the connected PostgreSQL database'],
  ['postgres', 'list_tables', 'List tables in the connected PostgreSQL database'],
  ['postgres', 'describe_table', 'Show columns and types of a PostgreSQL table'],
  ['calendar', 'list_events', 'List calendar events in a date range'],
  ['calendar', 'create_event', 'Create a calendar event'],
]
const publicName = (server: string, raw: string) => `mcp__${server}__${raw}`
const serverOf = (name: string) => CATALOG.find(([s, r]) => publicName(s, r) === name)![0]

/** `needs` are the definitions a careful engineer would expect; the run reports which were missed instead of asserting them. */
const TASKS = [
  { id: 'burp-history', prompt: '用 Burp 看一下 proxy 历史里最近访问 /api/user 的请求，把有 Authorization 头的那条详情拿出来', expect: ['burpsuite'],
    needs: ['burpsuite__proxy_history', 'burpsuite__proxy_detail', 'burpsuite__search_history'] },
  { id: 'burp-idor', prompt: 'Replay the captured GET /orders/1001 request with a different account cookie to check for IDOR, and compare the two responses', expect: ['burpsuite'],
    needs: ['burpsuite__repeater_send', 'burpsuite__repeater_modify_send', 'burpsuite__access_control_sweep'] },
  { id: 'github-pr', prompt: 'List the open pull requests on huohua-dev/dsh-jev-plugin and open the newest one', expect: ['github'],
    needs: ['github__list_pull_requests', 'github__get_pull_request'] },
  { id: 'unrelated', prompt: 'Refactor this TypeScript function to use early returns and add a unit test for the empty-array case', expect: [], needs: [] },
] as const

const cleanups: Array<() => Promise<void>> = []
afterEach(async () => { for (const cleanup of cleanups.splice(0).reverse()) await cleanup() })
const user = (text: string): UserMessage => createUserMessage({ source: { kind: 'user' }, content: [{ type: 'text', text }] })

async function fixture(options: { toolLimit: number; minProbability: number; waitMs: number }) {
  const dir = await mkdtemp(join(tmpdir(), 'jev-mcp-live-'))
  cleanups.push(() => rm(dir, { recursive: true, force: true }))
  const ctx = new Context()
  await mountAgentLoopTestDependencies(ctx)
  await ctx.plugin(Storage)
  await ctx.plugin(UserQuestions)
  const harness = await mountAgentLoopTestHarness(ctx)
  const backend = new JsonStorageBackend(join(dir, 'storage'))
  const unregister = ctx.storage.backend.register('json', backend)
  const facility = new DomainFacility(ctx, { backend: 'json' })
  ctx.provide('storageDomain', facility)
  cleanups.push(async () => { await ctx.fiber.dispose(); unregister(); await facility.closeAll(); await backend.close() })
  ctx.provide('profileContext', { dir: join(dir, 'profile') } as never)
  ctx.provide('settings', { configure: () => () => {} } as never)
  ctx.provide('credentials', { resolve: async () => ({ value: process.env.JEV_API_KEY!, source: 'environment' }) } as never)
  await ctx.plugin(JevService, { baseUrl: BASE_URL, model: MODEL, credentialRef: 'JEV_API_KEY', timeoutMs: 60_000,
    features: { 'mcp-selection': true } })
  await ctx.plugin(mcpSelection, { toolLimit: options.toolLimit, minProbability: options.minProbability, waitMs: options.waitMs })
  for (const [server, raw, description] of CATALOG) {
    ctx.tools.register(defineTool({ name: publicName(server, raw), description, parameters: {},
      output: { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] },
      execute: async () => 'never executed in this measurement' }))
  }
  return { ctx, harness }
}

describe.skipIf(!live)('native MCP selection against the real Jev endpoint (opt-in)', () => {
  it('measures latency, score separation and selection quality on a mixed multi-server catalog', async () => {
    const { ctx, harness } = await fixture({ toolLimit: 12, minProbability: 0.5, waitMs: 60_000 })
    const rows: string[] = []
    for (const task of TASKS) {
      const agent = await harness.create(SessionId(`live-${task.id}`))
      const message = user(task.prompt)
      agentEvents(ctx, agent).emit('agent/inbox/claimed', { message, turn: 1 })
      const started = Date.now()
      const assembly = await ctx.systemPrompt.assemble({ scope: agent, agent, signal: new AbortController().signal })
      const elapsed = Date.now() - started
      const shown = assembly.tools.map(tool => tool.name).filter(mcpSelection.isMcpPublicName)
      const servers = [...new Set(shown.map(serverOf))].sort()
      const records = await ctx.jev.listRecords({ sessionId: agent.session.id, limit: 5 })
      const detail = records.items[0] ? await ctx.jev.getRecord(records.items[0].id) : null
      const answers = detail?.attemptRecords[0]?.response?.answers ?? []
      const scores = answers.map(answer => (answer.kind === 'noul' ? answer.probability : NaN))
      const ranked = [...scores].sort((a, b) => b - a)
      const missed = task.needs.filter(need => !shown.includes(`mcp__${need}`))
      rows.push(JSON.stringify({ task: task.id, status: detail?.status ?? 'no-record', elapsedMs: elapsed,
        candidates: answers.length, shown: shown.length, servers, expected: task.expect,
        shownNames: shown.map(name => name.replace(/^mcp__/, '')), missedNeeded: missed,
        top3: ranked.slice(0, 3).map(value => Number(value.toFixed(3))),
        above05: scores.filter(value => value >= 0.5).length, above02: scores.filter(value => value >= 0.2).length }))
      expect(detail?.status, task.id).toBe('succeeded')
      expect(answers.length, task.id).toBe(CATALOG.length)
      for (const server of task.expect) expect(servers, task.id).toContain(server)
      if (task.expect.length === 0) expect(shown.length, task.id).toBeLessThanOrEqual(2)
    }
    // eslint-disable-next-line no-console -- the measurement itself is the deliverable of this opt-in run
    console.log('MCP-LIVE-RESULT\n' + rows.join('\n'))
  }, 600_000)
})
