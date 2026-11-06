# 2026-11-06 保留 MCP 功能的安全修复分支

## 分支决策

用户选择保留现有功能、暂缓新版宿主升级。`fix/security-preserve-mcp-20261106` 从原 `main` 的 `82984b4` 创建，不包含全量上游合并；本地/GitHub main 不修改，真实 profile 不变。全量上游仍保留在 `sync/upstream-20261106` 供审查，不推荐替代当前部署。

保留 DSH **0.2.1-rc.2**、Cordis 4.0.5、Typert generator 0.2.1-alpha.2 的现有基线与全部 DeepSeek 开发依赖 pin；原 MCP/技能筛选实现和旧插话实现不变。不是把新版 Host 上的 MCP 筛选恢复了，而是按选择避免引入导致功能缺口的宿主 API 升级。已有 profile 使用更高版本时，本分支不会自动降级其宿主。

## 修复内容

### 依赖漏洞

- zod 4.4.3 → **4.6.6**（两份正式清单 + 开发图内旧 v4）。
- vitest 4.1.8 → **4.1.12**，配套 mocker 等同版本。
- 针对有漏洞的传递版本增加限定范围 overrides：Vite 7.3.7、source-map-js 1.2.2、fflate 0.8.3、undici 8.12.2、fast-uri 3.1.9、MCP client 2.3.0（匹配 core 2.3.0）。
- 保留无关依赖主版本、Host pin 与 peer 声明。安装禁用生命周期脚本，frozen-lockfile 安装通过。
- **当前 `pnpm audit --json`：0 条已知漏洞，862 个依赖 entries，退出码 0。**见[复扫快照](2026-11-06-preserve-mcp-audit.json)。这是漏洞库匹配结果，不是无后门/无未知漏洞保证，也不会修补另一个已安装 Host 的依赖。

### 阶段导航敏感参数脱敏

精确回移上游 `c983390` 的 stage-input 修复：先解码 JSON，再递归脱敏嵌套键/值中的凭据；保留非敏感类型和值；无效参数 JSON 用明确标记代替，不发送原文。规则版本 v2→v3，旧分类变 stale，不自动重发判断。原 Session 保持不变。

验证包含转义/嵌套凭据、HTTP 请求与落盘记录，以及实际 v2 指纹缓存失效场景。旧版插话尚未引入原始工具参数扩展，因此本分支不引入再删除该泄露路径。

### PTC 审批与当前目录修复

回移 `c54e071` 的 run_code 取消信号兼容部分和 `2f854de` 当前目录证据修复，不引入新版 tool executor API。原 rc.2 Host 会组合 dispatch 与 sandbox-mode 信号，插件的严格对象等同性使 PTC 审批被错误跳过；复现原测试 2 项失败后修复。

仅 run_code 允许不同但存在的请求信号，仍绑定准确且唯一的活跃 Agent/callId/tool/reason/native dispatch，保持 workspace-write/ask 条件；dispatch/request/lifetime 任一取消都终止判断或阻止授权。原生 write/edit/bash/pwsh 保留信号等同性。公开事件没有 signal ancestry 字段，不能宣称超出这些绑定的来源证明。

审批快照/重试读取当前 WorkingDirectory，目标文件和相对 shell workdir 正确解析；原 sandbox workspaceRoot 另行保留，目录服务失败不退回陈旧目录。

## 兼容性边界

新 Host 提供公开 `NativeToolExecutor` / `setExecutor` 扩展，但不能自动装饰未知 PTC/自定义 executor；同步 describe 不能完全替代旧版首请求异步筛选与最后时刻刷新语义，卸载也不自动恢复父 executor。因此本次不实现语义改变的显式 native 模式，不修改 DSH。

MCP 原生产实现、原生审批权限与 PTC 呈现不变；用保留基线的真实 AgentLoop + localhost 判断服务测试验证，不使用“新 Host 明确关闭 MCP”的测试代替功能验证。

## 验证记录

- Node 24.21.0 / pnpm 11.7.0。
- 所有 DeepSeek 开发 pin 与原 main 一致，MCP、技能及插话生产实现与 main 无差异。
- check:compat 通过；这是 manifest 接受区间检查，不是全版本行为证明。
- 阶段导航定向测试 17/17；PTC/原生审批及目录定向测试 40/40。
- Host/Client 类型检查、完整构建通过。
- 最终完整 Vitest：**458 项通过、1 项真实模型测试跳过**，34 个测试文件通过，退出码 0。MCP 首请求筛选、恢复/缓存/Session 证据使用真实 rc.2 AgentLoop 与 localhost 判断服务验证；不替换为不可用断言。
- 重新构建后 runtime 与暂存交付内容字节一致，`git diff --exit-code -- runtime` 及 diff whitespace 检查通过。

保留初次失败事实：旧 MCP 客户端 mock 缺 connection identity 引发未处理 rejection，现补齐；共享结论、三轮 Goal 和 stage batch 的默认 1 秒等待在并行持久化负载下超时，现将相关持久化等待改为有界 3 秒而未弱化断言。PTC 失败为已复现的实际信号兼容缺陷，已回移修复，不是改断言掩盖。

未运行真实模型、用户 profile 安装、完整跨平台兼容矩阵或 UI 浏览器实测；现有 React 测试重复 key 和 tsdown 弃用警告与本次修复无关，保留记录。
