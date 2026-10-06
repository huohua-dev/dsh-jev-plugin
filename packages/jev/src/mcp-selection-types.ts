/** Profile-scoped settings for native MCP definition selection (not permissions). */
export interface McpSelectionConfigValues {
  /** Maximum automatically selected definitions; explicit pins/loads are additional. */
  toolLimit: number
  minProbability: number
  allowZero: boolean
  /** Exact public names, never server names, raw names or glob patterns. */
  pinnedTools: string[]
  waitMs: number
  maxRequestChars: number
}
/** Naming convention only, never an authenticated server/raw-tool identity. */
export const MCP_PUBLIC_NAME_PATTERN = /^(?=.{1,64}$)mcp__[A-Za-z0-9_-]+__[A-Za-z0-9_-]+$/
export function isMcpPublicName(name: string): boolean { return MCP_PUBLIC_NAME_PATTERN.test(name) }

export const MCP_SELECTION_DEFAULTS: McpSelectionConfigValues = {
  toolLimit: 12, minProbability: 0.5, allowZero: true, pinnedTools: [], waitMs: 4_000, maxRequestChars: 48_000,
}
