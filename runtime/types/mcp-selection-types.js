/** Naming convention only, never an authenticated server/raw-tool identity. */
export const MCP_PUBLIC_NAME_PATTERN = /^(?=.{1,64}$)mcp__[A-Za-z0-9_-]+__[A-Za-z0-9_-]+$/;
export function isMcpPublicName(name) { return MCP_PUBLIC_NAME_PATTERN.test(name); }
export const MCP_SELECTION_DEFAULTS = {
    toolLimit: 12, minProbability: 0.5, allowZero: true, pinnedTools: [], waitMs: 4_000, maxRequestChars: 48_000,
};
//# sourceMappingURL=mcp-selection-types.js.map