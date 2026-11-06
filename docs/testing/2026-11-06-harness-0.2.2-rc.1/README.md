## 直接答案

在 DSH **0.2.2-rc.1** 上安装本插件后（该行为变化自 0.2.2-alpha.2 起），**每个模型步骤都在调用模型之前失败**，界面显示“本轮运行失败”和 `Cannot read properties of undefined (reading 'some')`；与任何功能开关、判断服务是否可用都无关，卸载插件后恢复。原因是 MCP 筛选的 `system-prompt/assemble` 钩子取回提示组装结果后，**无条件**读取其中的 `tools`；0.2.2 在这条 waterfall 之后才附加工具声明，所以 waterfall 里没有 `tools`。

现在钩子遇到没有工具声明的结果会原样放行；检测到工具声明由宿主执行器持有的宿主（0.2.2 起）时，MCP 筛选保持不可用，不注册 `mcp_catalog` / `mcp_load` 和任何钩子。**其余功能在 0.2.2-rc.1 上按本地确定性矩阵全部通过**；0.2.1-rc.2 基线行为不变。

On DSH 0.2.2-rc.1 every model step failed before the model request with `Cannot read properties of undefined (reading 'some')`, whatever the feature switches. The MCP-selection hook read `tools` from the `system-prompt/assemble` payload unconditionally, but 0.2.2 attaches tool declarations only after that waterfall. The hook now passes such a payload through untouched, and on Hosts whose tool executor owns the declarations MCP selection stays inactive (no recovery tools, no hooks). The other features pass the local deterministic matrix on 0.2.2-rc.1, and 0.2.1-rc.2 behaves as before.

## 根因

修复前的构建在真实 0.2.2-rc.1 Host 上的堆栈（5 个用例各一次，栈顶相同；路径已省略）：

```text
TypeError: Cannot read properties of undefined (reading 'some')
    at withoutHelpers        (runtime/mcp-selection.js:377)
    at ctx.on.prepend        (runtime/mcp-selection.js:383)   <- system-prompt/assemble 钩子
    at async SystemPrompt.assemble   (dsh-system-prompt/lib/index.js:401)
    at async ReactLoopAgent.preStep  (dsh-agent-loop/lib/index.js:679)
```

| | 0.2.1-rc.2（本 fork 基线） | 0.2.2-rc.1 |
| --- | --- | --- |
| 传入 `system-prompt/assemble` waterfall 的对象 | `{ sections, contexts, tools, variables }`（至 0.2.1-rc.5） | `{ sections, contexts, variables }`；`assemble()` 在 waterfall 之后才返回 `{ ...transformed, tools }`（自 0.2.2-alpha.2） |
| `ctx.tools` 的工具声明来源 | 工具注册表自己产出（`wireSchemas(scope)`） | 执行器的 `describe()`；新增 `resolve`（按步骤激活）、`setExecutor`、`selectExecutor` |

逐个下载发布包核对 `dsh-system-prompt` 与 `dsh-tools`：0.2.1-rc.1 至 rc.5 的 waterfall 载荷含 `tools`、没有 `Tools.resolve` / `setExecutor`；已发布的 0.2.2-alpha.2、alpha.3、rc.1 的载荷不含 `tools`，且有 `resolve` / `setExecutor`。声明区间 `^0.2.1-alpha.2` 把这些版本都放进了安装器的接受范围，所以修复前的插件在它们上都会出现同一故障（按载荷形状推断，本轮只在 rc.1 上实际运行）。

钩子在检查功能是否开启、Agent 是否存活**之前**就调用 `withoutHelpers(original)`，所以功能开关无法避免这个错误——这就是“装上就报错”（所有功能默认关闭也一样）的原因。用修复前源码在单元夹具里复现：功能关闭、换另一个 Agent、甚至不带 Agent 的裸组装请求，遇到不含 `tools` 的 waterfall 都抛出同样的错误。

## 修复

[mcp-selection.ts](../../../packages/jev/src/mcp-selection.ts) 两处，其余模块、开发基线（0.2.1-rc.2）和 peer 声明区间均不变：

1. **结构防护**：`hasAssemblyTools()` 要求 waterfall 结果带有 `tools` 数组；没有就原样返回，不再把它当作可编辑的组装结果。
2. **静态让位**：`ctx.tools.resolve` 存在（执行器持有声明）时，功能仍然注册，并在 `settingsDescription` 中写明 “Unavailable on this Host”，随后在此返回——不注册两个辅助工具，也不注册任何钩子。Jev 页面对 `mcp-selection` 始终显示本地化的功能名与说明、忽略服务端的 `description`，但会把 `settingsDescription` 渲染为说明下方的提示行，所以原因写在这个字段里用户才看得到。仅靠第 1 点，0.2.2 上这两个工具会出现在每个模型请求里（原本隐藏它们的钩子在这里看不到声明），却不会有任何作用（目录恒为空、加载恒被拒绝，功能关闭时回答 “inactive”）。

选择让位而不是在 0.2.2 上重做 MCP 筛选，原因与[保留 MCP 的评审记录](../../reviews/2026-11-06-preserve-mcp-security.md)“兼容性边界”一致：新 Host 的步骤激活条件和限制在隐藏定义的同时也会拒绝执行，不能替代“只筛选定义”；通过 `setExecutor` 装饰执行器又无法自动适配未知的 PTC / 自定义执行器。上游归档分支 `archive/upstream-review-20261106` 对同一问题使用了相同的两层判断；本修复不引入其中的其他宿主升级。

## 验证

所有宿主检查使用官方发布的 `dsh` CLI、一次性 profile、本地确定性主模型和回环 Jev 服务，**真实模型调用为 0**。矩阵为 [compatibility-matrix.mjs](../../../scripts/validation/compatibility-matrix.mjs)，十三项功能在实验 profile 中全部开启。

| 检查 | 结果 |
| --- | --- |
| 修复前包，0.2.2-rc.1 | 安装成功、10/10 Host 行激活、连接诊断通过；5 个业务用例全部在第一个模型步骤失败，5 次 `agent/error` 均为上述 `TypeError`，主模型请求 0 次，Jev 请求仅 1 次（诊断） |
| 修复后包，0.2.2-rc.1 | 夹具通过：`agent/error` 0、意外提问 0、工具错误 0；10/10 Host 行保持激活；主模型请求 32 次、Jev 请求 86 次；技能、文件、指令、完成、跑偏、目标、插话、共享发现、两种日志、审批各有成功判断；日志省略与审批写入生效；阶段导航 10/10 步完成、0 失败 |
| 修复后包，0.2.2-rc.1 网页 | 客户端引导、插件卡、Jev 设置（13/13 功能开关）和判断记录页正常；页面错误与脚本加载错误 0。仅有的失败请求是宿主插件详情页取 README 的两张图片（见下） |
| 修复后包，0.2.1-rc.2 基线，含网页 | 严格模式通过：Jev 请求 86 次，13/13 开关，页面 / 控制台 / 脚本错误 0 |
| 单元与构建 | 34 个文件、461 个用例通过、1 个真实模型用例按设计跳过；Host 与 Client 类型检查、完整构建通过；`check:compat` 通过 |
| 新增回归用例 | 3 个。在修复前源码上，文本型 waterfall 用例以与用户相同的 `TypeError … (reading 'some')` 失败，执行器持有声明的用例也失败；修复后通过 |

## 限制与未覆盖

- **MCP 筛选在 0.2.2 上不可用**，这是有意的让位，不是“已验证可用”。功能开关仍可保存，但没有效果。
- **宿主插件详情页会请求 README 里的两张图片**（`docs/images/install-from-github.jpg`、`jev-feature-toggles.png`）并得到 404，因为它们不在 npm 包的 `files` 内。这只影响详情页里 README 的展示；严格的“控制台零错误”规则会因此判定网页检查失败，所以 **0.2.2-rc.1 没有登记到** [compatibility-versions.mjs](../../../scripts/validation/compatibility-versions.mjs)。上表的网页通过结果来自一次仅忽略这两个请求的本地运行（诊断补丁未提交）。是否随包附带这两张图，或在检查中放行它们，留给维护者决定。
- 未覆盖：实际运行 0.2.2-alpha.2 / alpha.3 与之后的 0.2.2 发布版（修复按结构与能力检测，不依赖版本号，但未逐个运行）、Windows / Linux、真实判断服务与真实主模型、自然任务效果。确定性夹具证明接入与消费路径，不证明判断质量。
- macOS 上不要把矩阵产物目录放在 `/tmp` 下：宿主的 `working_directory` 返回真实路径 `/private/tmp/…`，会使夹具中 `native-cwd-switch` 的路径相等断言误报失败（本轮第一次运行就是这样）。请使用不含符号链接的目录。

## 复现

```sh
# 官方 CLI（隔离目录）
npm install --prefix <cli-dir> @deepseek-ai/dsh@0.2.2-rc.1
echo '{"0.2.2-rc.1": "<cli-dir>/node_modules/@deepseek-ai/dsh/lib/bin.js"}' > runtime-map.json
# 构建并打包当前源码（npm 12 的 --json 输出是以包名为键的对象，直接读取 .tgz 文件名即可）
pnpm run build && npm pack --ignore-scripts --pack-destination <pkg-dir>
# 临时把 0.2.2-rc.1 加入 compatibility-versions.mjs，然后：
node scripts/validation/compatibility-matrix.mjs --runtime-map runtime-map.json \
  --artifacts <fresh-dir-without-symlinks> --version 0.2.2-rc.1 --final-package <pkg-dir>/dsh-jev-plugin-0.1.0.tgz
```

运行矩阵时请清理环境变量（特别是 `DSH_*`、`JEV_*`、`*KEY*`、`*TOKEN*`），与 [compatibility-smoke](../compatibility-smoke/README.md) 的做法一致；脚本只会剔除其中一部分 `DSH_*` 变量。
