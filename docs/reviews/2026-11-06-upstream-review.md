# 2026-11-06 上游合并与安全审查

## 结论与交付边界

这是**独立审查分支，不是可直接替换 main 的发布版本**。用户明确选择先完成审查分支，不更新本地或 GitHub `main`。不修改 DSH 源码，不安装到真实用户 profile，不调用真实判断模型，不发布 npm 包。

- Fork：`huohua-dev/dsh-jev-plugin`，原 main `82984b43d92f71ff5424cffe6b8acb4ab877f3bd`。
- Upstream：`luobosibing2/dsh-jev-plugin`，审查快照 `93ed43565cf6b01159dc7351865060012e7a1d97`。
- 共同基点：`5107235d83761491ae535cfe61ad3db3d91ffa82`。
- 分支：`sync/upstream-20261106`，包含 16 个原 fork 尚未纳入的上游提交（含 merge commit）。

在检查的上游生产代码、脚本、清单、CI 和生成产物中，**未发现具体恶意后门证据**；这不是保证没有后门，更不等于没有安全或兼容性问题。发现并修复一项新增敏感信息泄露路径；仍有 MCP 接口兼容性缺口和已知依赖漏洞，故不建议直接更新 main。

## 上游更新摘要

1. 开发依赖升级到 DSH `0.2.2-alpha.2`，Cordis `4.0.6-alpha.1`，Loader `1.0.7-alpha.1`；Typert 使用新 facade 和官方 Remote helper。增加 rc.2/rc.5 及 Windows 兼容性资料。
2. 插话分流区分后续任务、当前补充、即时纠正；即时纠正依赖 Host 的公开 `Agent.interruptResponse()`。未修改的已发布开发基线没有这个方法，不能把依赖版本号当作功能已可用的证明。关闭功能仍能加载。
3. 日志筛选与原生 spill/token 预算协同：预算不足或执行期间策略变化时保留 Host 原结果。默认省略概率从 0.8 调整为 0.7，显式 profile 配置优先。
4. 技能筛选支持正常的零推荐结果、成功空目录与明确 receipt，默认概率阈值 0.5（含等号）。保留 fork 当前策略：每个符合条件的非空目录参与判断，不恢复历史上已移除的小目录跳过逻辑；保留可编辑阈值 UI。
5. 阶段导航先解码 JSON 工具参数再脱敏；无效 JSON 用标记替代，不改原 Session。
6. 审批证据使用当前工作目录解析目标与脚本，同时保留原 sandbox 根边界和单操作授权流程。
7. 修复 Windows BSD tar 兼容性，增加回归测试、解释文档及经整理的公开规划记录。

## 安全发现

### 已修复：插话上下文新增原始工具参数外传（条件性中等风险）

上游新增的 [interjection-context.ts](../../packages/jev/src/interjection-context.ts) 原样保留工具调用参数，再由 [interjection.ts](../../packages/jev/src/interjection.ts) 交给共用判断服务；该服务先保存请求，再向配置的判断端点发送。此前普通 tool-call 参数不属于插话正文材料。如果 shell/API 参数含 literal token/password，就会新增一条到辅助记录和判断服务的泄露路径。

本分支不尝试用不可靠正则过滤任意命令，而是完全移除该上下文中的原始参数，只保留工具名称、call ID、状态；输出使用显式字段白名单，并更新 projection checkpoint 版本，旧参数快照不能复用。原始 Session 仍按宿主原有规则保留。

新增单元及端到端回归验证：普通、转义、无效 JSON 参数均不进入辅助投影；运行中的真实 native 工具调用触发插话时，localhost 判断请求、落盘后重新打开的 Jev ledger 和 network body 均不含测试秘密或原始参数，原 Session 仍保留准确参数。

边界：用户、助手、Goal 等既有文本仍可能包含秘密并发送给所配置服务；这不是全局脱敏，也不清理之前已有的 ledger/Session 记录。

### 未解决：MCP 筛选在新宿主上没有等价公开接口

新 Host 的 prompt assembly 只返回 presentation，工具定义由 step/tool executor 管理。使用工具条件或 restrict 会同时影响执行权限，不是仅筛选模型定义的等价方案；替换 executor 或改写 LLM 请求也不符合项目约束。

[实现](../../packages/jev/src/mcp-selection.ts) 对提供 `tools.resolve()` 的新接口宿主明确退出筛选：仍注册功能/设置，但不注册恢复工具、不发起判断、不修改原生目录/权限。UI 显示中英文不可用说明。旧 schema-bearing assembly 路径保留，使用结构检查。现代 Host 集成测试验证目录、Session 请求头、审批/拒绝和 PTC 不变；旧路径 contract adapter 测试不等价于真实旧宿主完整复测。

**需要后续获得公开 definition-only selection 接口，或者明确选择不合入此次基线升级；本次不宣称恢复了新宿主上的 MCP 筛选。**

### 未解决：依赖漏洞

`pnpm audit --json` 返回非零：**24 条（7 high、14 moderate、3 low、0 critical）**。详见[机器可读摘要](2026-11-06-dependency-audit.json)。

- 正式依赖 `zod 4.4.3`：超大受约束集合校验可能耗尽内存，[GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)，公告修复范围 `>=4.6.6`。Zod 还被构建进 client bundle，因此不能只按开发依赖处理。
- 其余条目标记为开发依赖，包含 Vitest/mocker、Vite、source-map-js、undici、fast-uri、fflate、MCP client 的相关漏洞。
- 所有命中的 package/version 组合在原 `origin/main` 锁文件也存在；这证明不是本次新引入这些版本，不证明两边依赖路径、攻击面或可利用性完全相同。
- 未运行 `audit fix`、未升级整棵依赖树，避免把合并审查扩展为未经验证的供应链重写。建议单独修复并复验，尤其 Zod。

## 审查范围与供应链结果

检查生产源代码差异及对应部署 runtime，重点覆盖网络/凭据、原生审批、分流、stage 输入和日志预算；独立复核清单、锁文件、构建脚本、CI、兼容测试工具、bench/website 和公开记录。

- 未发现新增 preinstall/install/postinstall/prepare 钩子；允许构建脚本列表未新增项目。实际安装使用 frozen lockfile 和 `--ignore-scripts`。
- 锁文件 893 个 package entries 的 resolution 使用 integrity，没有显式任意 tarball 地址。此处不是逐包源码审计。
- 新 Remote helper 的 import AST 检查只能证明依赖闭包，不是安全认证；本次人工检查了当前 helper 的逻辑，并从源码重新构建 runtime。
- CI 未新增 `pull_request_target`、秘密插值或权限提升；既有 major-tag actions 是后续加固点。
- 新公开规划/报告未发现实际凭据、原始 Session dump 或个人绝对路径泄漏。历史文档中的授权描述不作为本次新增操作授权。
- 未运行会另行安装完整 Host 的 `test:compatibility`、浏览器/真实 profile 验证或 source-host interruption 联动实验。脚本回归使用本地假服务/包管理 shim，不代表完整跨版本安装通过。

## 验证记录

- 锁文件安装：pnpm 11.7.0，`--frozen-lockfile --ignore-scripts`，通过；Node 24.21.0。
- `check:compat`：通过，保留 fork 的 `>=0.1.7-rc.1 <=0.2.0-rc.2 || ^0.2.1-alpha.2` 接受区间和 rc.1 验证目标；安装接受不代表每个版本功能已验证。
- Host/Client TypeScript 检查及完整构建：通过，包含生成 Remote helper 和重新生成 `runtime/`。
- Python 技能选择分析回归：6/6 通过。
- 最终完整 Vitest：`node node_modules/vitest/vitest.mjs run --exclude '**/.artifacts/**'`，37 个文件通过、1 个跳过；**545 项通过、1 项跳过**，退出码 0。跳过项是需显式开启的真实 MCP/Jev 调用，未调用真实模型。
- 重新完整构建后，`git diff --exit-code -- runtime` 通过，且 runtime 无新未跟踪文件；生成产物与已暂存交付字节一致。
- 合并冲突标记与 `git diff --cached --check` 检查通过；原 checkout 的 main 和 origin/main 仍为 `82984b4`。
- 保留的非失败警告：阶段导航测试夹具 React 重复 key `111`；tsdown `external` 配置弃用提示。未声称消除所有既有 UI 问题。

初次完整并行测试暴露两个默认 1 秒异步等待超时及旧 MCP UI mock 缺少 connection identity 导致的未处理 rejection；后续并行重跑又暴露一项 stage batch 默认 1 秒等待超时。相关测试单独均通过；三个涉及串行 HTTP/持久化的等待改为有界 3 秒，未改业务断言，mock 补齐真实接口所需 connection identity。最终完整并行重跑通过，不以删测试、跳过断言或吞异常代替验证。
