/**
 * Resolve the exact live root without inferring modern runtime ownership from durable Session lineage.
 * Older Hosts expose registry roots; rc.2 delegates tree membership to the subagent service. Missing or
 * refused modern queries fail closed: origin alone cannot identify a delegated Session with an own descriptor.
 */
export function liveRootOf(ctx, agent) {
    if (ctx.agents.get(agent.id) !== agent)
        return undefined;
    const registry = ctx.agents;
    if (typeof registry.roots === 'function') {
        // Preserve the legacy shared-findings lookup, but reject stale registry instances and cyclic lineage.
        const roots = registry.roots();
        let current = agent;
        const visited = new Set();
        while (current !== undefined && ctx.agents.get(current.id) === current && !visited.has(current)) {
            visited.add(current);
            if (roots.includes(current))
                return current;
            const parent = current.session.header.parentSession;
            current = parent === undefined ? undefined : ctx.agents.get(parent);
        }
        return undefined;
    }
    const tree = ctx.get('subagents');
    if (typeof tree?.rootOf !== 'function')
        return undefined;
    try {
        const root = tree.rootOf(agent);
        return ctx.agents.get(root.id) === root ? root : undefined;
    }
    catch {
        // An unavailable manager or orphaned/replaced member must not be treated as an independent root.
        return undefined;
    }
}
export function isLiveRoot(ctx, agent) {
    if (agent === undefined || ctx.agents.get(agent.id) !== agent)
        return false;
    const registry = ctx.agents;
    if (typeof registry.roots === 'function')
        return registry.roots().includes(agent);
    return liveRootOf(ctx, agent) === agent;
}
/** Return a fresh array of exact live roots, in registry order. */
export function liveRoots(ctx) {
    return ctx.agents.list().filter(agent => isLiveRoot(ctx, agent));
}
//# sourceMappingURL=agent-roots.js.map