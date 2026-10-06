/** Profile-scoped native MCP definition selection; saving never enables the feature. */
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client';
import { type McpSelectionConfigValues } from '../mcp-selection-types.ts';
import type { JevLocaleKey } from './locales.ts';
/** Render the independent MCP configuration using the incumbent settings controls. */
export declare function McpSelectionSettings({ form, notifySuccess, t }: {
    form: ConfigForm<McpSelectionConfigValues>;
    notifySuccess: (message: string) => void;
    t: (key: JevLocaleKey) => string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=McpSelectionSettings.d.ts.map