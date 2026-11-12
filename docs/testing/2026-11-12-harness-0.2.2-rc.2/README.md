# DSH 0.2.2-rc.2 启用失败修复 / Activation compatibility

## 状态与上游

本修复基于 fork `main` 的 `25afbe8`，在隔离分支 `sync-upstream-20261112` 完成验证；2026-11-12 用户授权将修复提交合入 main 并推送 GitHub。此授权不包含更新真实用户 profile。开发依赖保持 DSH 0.2.1-rc.2；没有修改 DSH 本身。

2026-11-12 已 fetch 上游 `luobosibing2/dsh-jev-plugin` 至 `c115bf4`。上游仍在多个功能中调用 `ctx.agents.roots()`，包括插话组件初始化；manifest 精确列表最高包含 0.2.2-alpha.2，不接受 0.2.2-rc.2。因此直接更新上游不能解决本次故障。全量合并模拟产生 25 个冲突路径，且涉及原有 MCP 功能、开发基线和安全依赖；本次只做针对性兼容修复，不执行全量合并。

## 根因

官方 0.2.2-rc.1 的 Agent registry 提供 `roots()`，0.2.2-rc.2 移除了它和 registry 层的 runtime ownership API；公开的 `ctx.subagents.rootOf(agent)` 现在负责运行时树成员关系。

修复前正式包在隔离官方 0.2.2-rc.2 profile 安装成功，但 `jev-interjection-routing` 初始化失败：

```text
TypeError: ctx.agents.roots is not a function or its return value is not iterable
    at new apply (runtime/interjection.js:349:33)
```

其他功能也依赖此 API，不能只绕过插话加载。该调用发生在功能开关判断之外，关闭插话功能本身不能避免激活失败。

## 修复

- 新增共享根 Agent 兼容层，并替换 7 个模块的直接 `roots()` 调用。
- 旧 Host 保留 registry roots 语义；新 Host 通过 subagent service 查询 exact live root。
- 缺少查询能力、manager 未就绪、查询拒绝、孤儿或相同 id 的旧实例均不推断为 root。不能仅靠 `header.origin` 判定：Host 还识别 Session 自有 descriptor。
- shared-findings 在新 Host 直接使用 runtime root，不沿历史 `parentSession` 回退；中间创建者下线不切断仍有效的树，旧实例也不会误关联到同 id 的替代 root。
- 兼容夹具适配子代理工具返回“名称”而非 Session id 的变化，使用公开 `resolveName` 还原身份，保留原身份断言。
- 根安装包补带两张已跟踪的 README 图片；网页检查仍严格拒绝所有 console/page/import errors，没有图片错误豁免。
- 新增 12 项根身份回归和 1 项 README 图片打包声明回归；重新生成 runtime。

## 验证

Node 24.21.0、pnpm 11.7.0、macOS；全部使用独立测试 profile、固定主模型适配器及 localhost 判断服务，真实模型调用为 0。

| 检查 | 结果 |
| --- | --- |
| 修复前 rc.2 | 安装成功，插话 Host 行失败，等待 10 行 ACTIVE 超时，判断请求 0 |
| 最终 rc.2 Host | 10/10 行持续 ACTIVE；agent/error、工具错误、意外人工提问均 0；5 个业务案例通过；33 个固定模型请求、87 个本地判断请求 |
| 最终 rc.2 Web | 引导、插件卡、13 个配置开关和判断记录页通过；page/console/import errors 均 0 |
| 保留 0.2.1-rc.2 Host + Web | 严格矩阵通过；32 个固定模型请求、86 个本地判断请求；浏览器错误 0 |
| 阶段导航 | 两版本均完成 10/10 步，失败 0 |
| 日志与审批 | 两版本日志省略被采纳，隔离授权目标写入正确 |
| 完整 Vitest | 474 passed，1 个真实模型测试按设计 skipped；35 文件通过、1 文件跳过 |
| 类型检查 / 构建 / manifest 区间检查 | 通过 |

子代理结束通知与步骤时序可能增加一次普通末轮判断，因此请求数量不是固定的通过条件。矩阵主动 SIGINT 停止测试 Host（退出 130），不代表业务失败。

保留失败事实：第一次兼容修复仅完成 Host 激活，旧夹具把子代理名称当 Session id，导致共享报告断言失败；修复夹具后通过。初次网页检查因 README 图片 404 失败，补齐打包后以原严格规则通过。新 helper 的首次类型检查缺少递归祖先变量类型，补明确类型后通过。生成声明仅有联合/枚举顺序变化的条目随构建保留。

## 限制

- MCP 筛选在 DSH 0.2.2 上仍不可用，沿用上一修复的明确让位；并未恢复这项功能。
- 未测试真实判断模型、自然任务效果、Windows/Linux 或所有声明接受的 0.2.x 版本。
- 未更新真实 profile，也未在用户运行中的桌面 GUI 验收；网页验证来自隔离官方 Host。
- 原始测试 Session、临时凭据与本机路径仅留在忽略的 `.artifacts/`，不纳入公开报告。

## English summary

This revision fixes Jev activation on DSH 0.2.2-rc.2 after `AgentRegistry.roots()` was removed. Upstream `c115bf4` still calls the removed API and does not declare rc.2 support. The compatibility layer uses the public subagent runtime root query on new Hosts, preserves the legacy registry path, and fails closed for missing/refused ownership. Shared findings no longer reconstruct modern runtime ownership from durable Session lineage. The packaged README images are included rather than ignoring browser errors. Strict official Host/Web matrices pass for 0.2.2-rc.2 and retained 0.2.1-rc.2; 474 tests pass and one live-model test is skipped. MCP selection remains unavailable on 0.2.2. No live models or user-profile changes were performed. After validation, the user authorized main-branch integration and a GitHub push on 2026-11-12.
