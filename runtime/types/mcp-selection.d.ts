import type { Context, Volatile } from '@deepseek-ai/cordis';
import s from '@deepseek-ai/schemastery';
import { type McpSelectionConfigValues } from './mcp-selection-types.ts';
export { isMcpPublicName } from './mcp-selection-types.ts';
export interface Config {
    toolLimit: Volatile<number>;
    minProbability: Volatile<number>;
    allowZero: Volatile<boolean>;
    pinnedTools: Volatile<string[]>;
    waitMs: Volatile<number>;
    maxRequestChars: Volatile<number>;
}
export declare const Config: s<McpSelectionConfigValues, Config>;
declare module '@deepseek-ai/dsh-llm' {
    interface MessageSourceMap {
        'jev-mcp-selection': {
            kind: 'jev-mcp-selection';
            form: 'notice';
        };
    }
}
export declare function apply(ctx: Context, config: Config): void;
export declare const inject: string[];
//# sourceMappingURL=mcp-selection.d.ts.map