# 2026-11-06 安全修复与宿主兼容决策

本记录补充而不覆盖[初次审查](2026-11-06-upstream-review.md)和[当时的 24 项漏洞结果](2026-11-06-dependency-audit.json)。用户选择保留现有 MCP 功能、暂缓新宿主升级；本全量上游审查分支仍不合入 main。另从原 main 准备旧基线安全修复分支。

## 依赖修复

采用已发布的最小修复版本，不升 Vitest/Vite/Undici 等的主版本，不执行 `audit fix`：

| 包 | 修复版本 |
| --- | --- |
| zod（两份正式依赖清单及开发图内旧 v4） | 4.6.6 |
| vitest / 配套 @vitest 包 | 4.1.12 |
| vite（旧 v7） | 7.3.7 |
| source-map-js | 1.2.2 |
| fflate（旧 0.8） | 0.8.3 |
| undici（旧 v8） | 8.12.2 |
| fast-uri（旧 v3） | 3.1.9 |
| @modelcontextprotocol/client（旧 v2） | 2.3.0 |

传递依赖通过限定版本范围的 pnpm overrides 修复，MCP client 带入匹配的 core 2.3.0。未改 DSH 开发基线、peer range 或审批语义。安装全程 `--ignore-scripts`；随后 frozen-lockfile 安装验证通过。依赖元数据来自 npm registry，对照版本、时间、引擎和脚本；未做每个依赖的完整源码审计。

复扫 `pnpm audit --json`：**0 条已知漏洞**，892 个依赖 entries；退出码 0。扫描只证明当时漏洞库没有命中，不证明没有后门或未知漏洞。工作区 overrides 不会修补用户已安装的 DSH 或另一项目依赖；正式插件自身 Zod 已改精确版本并重新打进 client bundle。

验证：Node 24.21.0 / pnpm 11.7.0；Host/Client 类型检查、完整构建、check:compat 通过；Vitest 4.1.12 完整测试 **545 通过、1 个真实模型测试跳过**。因新 Zod bundled 内容变化，client bundle 从约 744 KB 增至约 949 KB（构建 gzip 约164 KB），不是未知脚本注入。

## MCP 研究结论与决策

修正早期表述：官方**已有公开原生执行器扩展接口**，不是完全没有可用扩展。`NativeToolExecutor` 可公开构造，并通过 `ctx.tools.setExecutor` 显式选择；执行可原样委托官方实现，保留审批和日志。

但是它不构成现有插件的无损自动替代：

- 没有取得/包装未知既有 executor 的公开接口，自动替换可能覆盖 PTC 或自定义执行器；需显式 native opt-in。
- `describe(definitions)` 同步执行。AgentLoop 先 resolve 工具，再组装并克隆 schema，之后才执行异步 pre-step。pre-step 判断可用于下一步，但不能保证旧实现的首请求筛选及后续 pre-step 改写时恢复原目录。
- executor 卸载留下 unavailable 状态，不自动恢复父层执行器；不能把功能开关简单等同于卸载。
- 借用恢复工具的 async activation condition 作为判断准备旁路仍缺乏最终集合及重校验边界，不作为功能等价交付。

检查新版 `0.2.2-rc.1` 公开接口仍有上述限制，因此不为解决 MCP 而盲目再升级宿主。

用户选择：**保留旧基线原有 MCP 功能，暂缓采用新 Host 基线**。本分支保持之前明确的不可用提示，不宣称新版筛选已恢复；旧基线修复另行提交，以便未来审核，不更改 main 或真实 profile。

接口依据：[官方 native executor 源码](https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/dsh-v0.2.2-rc.1/packages/core/tool-executor-native/src/index.ts)、[公开说明](https://unpkg.com/@deepseek-ai/dsh-tool-executor-native@0.2.2-rc.1/README.md)、[ToolsService 声明](https://unpkg.com/@deepseek-ai/dsh-tools@0.2.2-rc.1/lib/types/index.d.ts)。
