//#region packages/jev/lib/types/agent-roots.js
/**
* Resolve the exact live root without inferring modern runtime ownership from durable Session lineage.
* Older Hosts expose registry roots; rc.2 delegates tree membership to the subagent service. Missing or
* refused modern queries fail closed: origin alone cannot identify a delegated Session with an own descriptor.
*/
function liveRootOf(ctx, agent) {
	if (ctx.agents.get(agent.id) !== agent) return void 0;
	const registry = ctx.agents;
	if (typeof registry.roots === "function") {
		const roots = registry.roots();
		let current = agent;
		const visited = /* @__PURE__ */ new Set();
		while (current !== void 0 && ctx.agents.get(current.id) === current && !visited.has(current)) {
			visited.add(current);
			if (roots.includes(current)) return current;
			const parent = current.session.header.parentSession;
			current = parent === void 0 ? void 0 : ctx.agents.get(parent);
		}
		return;
	}
	const tree = ctx.get("subagents");
	if (typeof tree?.rootOf !== "function") return void 0;
	try {
		const root = tree.rootOf(agent);
		return ctx.agents.get(root.id) === root ? root : void 0;
	} catch {
		return;
	}
}
function isLiveRoot(ctx, agent) {
	if (agent === void 0 || ctx.agents.get(agent.id) !== agent) return false;
	const registry = ctx.agents;
	if (typeof registry.roots === "function") return registry.roots().includes(agent);
	return liveRootOf(ctx, agent) === agent;
}
/** Return a fresh array of exact live roots, in registry order. */
function liveRoots(ctx) {
	return ctx.agents.list().filter((agent) => isLiveRoot(ctx, agent));
}
//#endregion
export { liveRootOf as n, liveRoots as r, isLiveRoot as t };
