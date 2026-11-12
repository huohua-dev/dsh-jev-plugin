# 2026-11-12 上游选择性合并 / Selective upstream merge

## 结论

上游 `luobosibing2/dsh-jev-plugin` 的 `main`（`c115bf4`，2026-11-10）比本 fork 多 19 个提交。逐个核对后**合入 5 个**，其余记为「已有」「拒绝」。合入方式是逐个 `cherry-pick`（保留原作者，`cherry-pick` 来源写进提交说明）并重新构建 `runtime/`，**不把上游历史合入 main**：上游 19 个提交中有 14 个被拒绝，若做普通合并，这些决定会变得不可见，之后 `git merge upstream/main` 还会把被拒绝的提交当成已处理。审查边界另用标签 `archive/upstream-review-20261112`（指向上游 `c115bf4`）标记，之后同步从该点之后开始、逐提交挑选。

`luobosibing2/dsh-jev-plugin` `main` (`c115bf4`) is 19 commits ahead of this fork. **5 were taken**; the rest are recorded as already present or declined. They were cherry-picked individually (original authorship preserved, provenance in each message) with `runtime/` rebuilt. Upstream history is **not** merged into main: 14 of the 19 were declined, and a normal merge would hide that decision while making a later `git merge upstream/main` treat those commits as handled. The review boundary is marked by the annotated tag `archive/upstream-review-20261112` (pointing at upstream `c115bf4`); the next sync starts after it and picks commit by commit.

保留的 fork 决策不变：开发基线 DSH 0.2.1-rc.2、fork 自有的 MCP 筛选、peer 区间 `^0.2.1-alpha.2`（上游改成了精确版本列表，会拒绝 0.2.2-rc.2）。/ Unchanged fork decisions: DSH 0.2.1-rc.2 baseline, the fork's own MCP selection, and the `^0.2.1-alpha.2` peer range (upstream's exact-version list would reject 0.2.2-rc.2).

## 已合入 / Taken

| 上游提交 | 内容 | 本 fork 提交 |
| --- | --- | --- |
| `0f35554` (#43) | 插话历史预算：预算耗尽后 `slice(-0)` 返回整段文本，较早历史绕过 `contextChars` 仍被发给判断服务。耗尽即停；新增回归覆盖 5 种预算 | `8317b59` |
| `1dbf5ce` (#35) | 日志准入两个分支的默认 `omitProbability` 0.8 → 0.7，显式配置仍优先；附阈值评估报告。两个功能默认仍关闭 | `b64b764` |
| `3f8ed56` (#39) | Windows：比较解码后的工具结果文本，而不是转义后的 JSON；加对应 CI 步骤 | `ab3e00a` |
| `0a7f94a` (#56) | 兼容性包解包改用压缩包同目录的相对文件名，GNU tar 与 Windows BSD tar 通用；附真实 `tar` 回归 | `b747e50` |
| `c115bf4` (#60) | Windows 夹具依赖用目录 junction，不需要符号链接权限；其他平台不变 | `fbb9082` |

后三者只涉及校验脚本与测试，不改变运行时。

上游的私有规划记录 `.agents/notes` 不入库（本 fork 不追踪该目录）：`0a7f94a` 带 4 个文件、`c115bf4` 带 7 个，均已排除。`0a7f94a` 的脚本冲突按上游最终形态解决，因为中间的 `--force-local` 提交（`81e6032`）不取。`c115bf4` 只取它自己的回归用例，相邻的「拒绝不受支持的开发 Host」用例属于被拒绝的 `93ed435`。

## 已有 / Already present

| 上游提交 | 说明 |
| --- | --- |
| `c983390` (#41) 阶段参数脱敏 | `stage-input.ts` 与上游逐字节一致（2026-11-06 回移） |
| `2f854de` (#47) 审批证据取当前目录 | `workspace-approval.ts` 与上游逐字节一致 |
| `c54e071` (#44) 支持 0.2.1-rc.2 | 源码部分（`workspace-approval.ts`）已一致；其余是给缺少协议子路径的宿主打包 Remote 辅助脚本，本 fork 固定旧版生成器、不引用 `typert.remote-info` |

## 拒绝 / Declined

| 上游提交 | 理由 |
| --- | --- |
| `93ed435` (#54) 插话改用原生响应中断 | 依赖 `Agent.interruptResponse()`；已核对 DSH 0.2.2-alpha.3、rc.1、rc.2 的 `dsh-agent` 与 `dsh-agent-loop` 发布包，均无该接口，在这些宿主上开启会直接报 `ROUTING_HOST_UNSUPPORTED`，且它**替换**了目前可用的实现。它的新输入投影会把工具调用的原始参数（`ToolMaterial.arguments`）送进判断请求；上游 issue #61 与 PR #62（均开放）报告的凭据泄露正出在这里。本 fork 现有实现只取消息的文本块，不含工具调用参数（工具结果文本仍在 `contextChars` 预算内发送，`8317b59` 把该预算真正收紧）。待发布版提供该接口、且 #62 落地后再评估 |
| `49a5ee4` (#57) Noul 空 criteria | 为第三方「严格」System One 服务而加；对 `jev` 连接会给每个未带 criteria 的 Noul 问题增加 `criteria: {"true":"","false":""}`。这是对现有请求体的行为改变，而本项目无法在不调用真实判断服务的情况下验证其兼容性。使用严格端点时再评估 |
| `49d0994` (#48) 日志准入协调原生 spill 预算 | 读取 Cordis 内部状态（`fiber.state`、`fiber.runtime.callback`、`Context.filter`）来判断宿主内部策略，违反本仓库「只用文档化扩展点」的约定；同时把 `@deepseek-ai/dsh-token-meter` 变成非可选 peer。相关包本身是可获取的，所以拒绝理由不是依赖缺失，而是这种耦合在宿主升级时容易失效 |
| `6917209` (#49) 发布规划记录 | 不止文档：它改了 `.gitignore` 与 `AGENTS.md`，把 `.agents/notes` 从「保持私有、不入库」改成「默认入库」。这与本 fork 现行的 `AGENTS.md` 约定相反，因此连同其 `.agents/notes` 内容一并拒绝 |
| `4909a17` (#51) 支持 0.2.1-rc.5 | 把开发基线与 peer 声明改成以 0.2.1-rc.5 为顶点的精确版本列表，会拒绝 0.2.2-rc.2；同时改浏览器校验脚本。基线决策不变 |
| `81e6032` (#52) 支持 0.2.1-rc.3 | 版本支持与 Windows 证据文档；`scripts/validation/compatibility-smoke.mjs` 的 `--force-local` 已被 `0a7f94a` 取代；夹具里的 Windows 专用改动（shell 工具名、测试隔离参数）在本 fork 的校验面上无对应用途，macOS 矩阵无需它们即可通过 |
| `adc1ca6` `d2b7229` | 合并提交（PR #51、PR #57）；`d2b7229` 是 `49a5ee4` 那支分支的合并点，本身不含独立内容 |
| `a2a2fdf` (#36) `c673f79` (#45) | 发布上游站点与实测记录：除 Markdown 外还改了 `website/build.mjs`（`a2a2fdf` 另有 `website/README.md` 和一篇新原理页、`c673f79` 另有上游自己的真实服务冒烟结果）。这些是上游站点的发布内容，不是插件运行时；本 fork 不维护该站点，也不带入他人的真实服务结果 |
| `40f4f33` (#37) 允许零技能推荐 | fork 的 `7c932e5` 已实现同一功能（同名 `skillMinProbability`、默认 0.5、同样允许零推荐），并多了设置页输入框；回执 ID `skill-catalog-none-relevant` 已写入现有账本，换成上游实现会造成命名不一致 |

## 验证

- 完整 Vitest：482 通过、1 个真实模型用例按设计跳过。
- `pnpm run check:compat`、`pnpm run typecheck`、`pnpm run build` 通过；构建后 `runtime/` 与提交内容逐字节一致（CI 的同一条检查）。
- 官方 DSH **0.2.2-rc.2**：Host + Web 严格矩阵通过（10/10 Host 行持续 ACTIVE，浏览器 page/console/import 错误为 0）。
- 保留基线 **0.2.1-rc.2**：`pnpm run test:compatibility` 端到端通过，含本轮改动后的 `unpack` 步骤（相对文件名解包）与 96 个打包文件对新建产物的逐字节比对。
- 全部检查使用隔离测试 profile、固定主模型与 localhost 判断服务，真实模型调用为 0。
- `0f35554` 的回归已验证可失败：去掉那一行后 5 个预算用例全部失败，恢复后通过。

Full Vitest 482 passed / 1 live-model test skipped; `check:compat`, typecheck and build pass with `runtime/` byte-identical to the commit; strict Host + Web matrices pass on official DSH 0.2.2-rc.2 and the retained 0.2.1-rc.2 baseline, the latter through `pnpm run test:compatibility` including the changed `unpack` step. Zero live model calls. The budget regression was confirmed to fail without its fix.

## 限制 / Limits

- 未使用真实判断服务与真实主模型；未在 Windows 上运行：Windows 相关挑选只在 macOS 上做了单元测试，不代表 Windows 的完整 Host/Web 验证通过。
- 默认阈值 0.7 来自上游的有限样本评估（单个真实项目、6 个「必须保留」观察），报告已写明局限；它不代表 70% 准确率。已启用日志准入且未显式设置门槛的 profile 升级后会采用 0.7，见[验证说明](../validation.md)。
- 被拒绝项是「此刻不合」的判断，不是永久结论；上游提交仍可从 `upstream/main` 取得。
