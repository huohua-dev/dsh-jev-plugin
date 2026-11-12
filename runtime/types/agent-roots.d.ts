/** Live runtime roots across the legacy Agent registry and rc.2 subagent tree APIs. */
import type { Context } from '@deepseek-ai/cordis';
import type { Agent } from '@deepseek-ai/dsh-agent';
/**
 * Resolve the exact live root without inferring modern runtime ownership from durable Session lineage.
 * Older Hosts expose registry roots; rc.2 delegates tree membership to the subagent service. Missing or
 * refused modern queries fail closed: origin alone cannot identify a delegated Session with an own descriptor.
 */
export declare function liveRootOf(ctx: Context, agent: Agent): Agent | undefined;
/** A definite Agent yields boolean; a possibly absent one narrows only on success. */
export declare function isLiveRoot(ctx: Context, agent: Agent): boolean;
export declare function isLiveRoot(ctx: Context, agent: Agent | undefined): agent is Agent;
/** Return a fresh array of exact live roots, in registry order. */
export declare function liveRoots(ctx: Context): Agent[];
//# sourceMappingURL=agent-roots.d.ts.map