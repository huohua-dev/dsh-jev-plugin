/** Profile-scoped settings for native MCP definition selection (not permissions). */
export interface McpSelectionConfigValues {
    /** Maximum automatically selected definitions; explicit pins/loads are additional. */
    toolLimit: number;
    minProbability: number;
    allowZero: boolean;
    /** Exact public names, never server names, raw names or glob patterns. */
    pinnedTools: string[];
    waitMs: number;
    maxRequestChars: number;
}
/** Naming convention only, never an authenticated server/raw-tool identity. */
export declare const MCP_PUBLIC_NAME_PATTERN: RegExp;
export declare function isMcpPublicName(name: string): boolean;
export declare const MCP_SELECTION_DEFAULTS: McpSelectionConfigValues;
//# sourceMappingURL=mcp-selection-types.d.ts.map