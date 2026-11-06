# deepseek-harness-jev

The English guide for the `main` integration, including Jev and both Luna Decisions APIs, is on the repository home page: [Read the English README](README.md).

[Plugin CI](.github/workflows/ci.yml) checks pull requests and pushes to `main` with the frozen lockfile, type check, tests, build, and committed runtime comparison. See [Development](README.md#development) for the commands and runtime update requirements.

The [compatibility smoke guide](docs/testing/compatibility-smoke/README.md) describes `pnpm run test:compatibility`: a fresh official package, disposable DSH installation, Host checks and an actual Jev Web page check, using local deterministic replies.

The Chinese [principles and all features explainer](https://luobosibing2.github.io/dsh-jev-plugin/explainers/dsh-jev-plugin.html) covers the 12 upstream features with a complete skill-selection input/output example. This fork additionally includes MCP tool selection: 13 independently configurable features, all disabled by default. The [Markdown source](docs/explainers/dsh-jev-plugin.md) is maintained in this repository.

The [quick review directory](https://luobosibing2.github.io/dsh-jev-plugin/#quick-review) includes the Chinese [log-admission interview guide](https://luobosibing2.github.io/dsh-jev-plugin/explainers/log-admission-interview.html), covering generic and test logs, design choices, live-model results and their limits. Its [Markdown source](docs/explainers/log-admission-interview.md) is maintained in this repository.

The Chinese [Goal supervision and completion review](https://luobosibing2.github.io/dsh-jev-plugin/explainers/goal-completion-review.html) follows the two current flows, limited supplements and delivery records, with historical live-model results kept separate. Its [Markdown source](docs/explainers/goal-completion-review.md) is maintained in this repository.

The [2026-10-09–10 Harness compatibility report](docs/testing/2026-10-09-harness-compatibility/README.md) records official DSH 0.2.1-alpha.2 installation, Web smoke checks, and real DeepSeek Flash / Jev experiments, including retained failures and untested channels.

The [2026-10-11 version compatibility report](docs/testing/2026-10-11-harness-version-compatibility/README.md) records five released DSH runtimes, official installation and local deterministic feature checks. The current [installation guide](README.md#install-through-the-web-ui-recommended) declares the fork peer range `>=0.1.7-rc.1 <=0.2.0-rc.2 || ^0.2.1-alpha.2`, which accepts releases beyond the individually validated targets. Published verification targets retain 0.2.1-rc.1 and rc.2 and add rc.5, the default smoke target; the development packages and Typert generator are pinned to 0.2.2-alpha.2, Cordis to 4.0.6-alpha.1 and Loader to 1.0.7-alpha.1. Enabled interjection routing additionally requires the public `Agent.interruptResponse()` capability; neither an accepted version nor the source-build baseline establishes that published-release capability. The plugin does not patch DSH.

The [2026-10-21 Harness compatibility report](docs/testing/2026-10-21-harness-compatibility/README.md) covers the 0.2.1-rc.2 upgrade with deterministic official-package, Host and Web integration checks and zero live model calls.

The [2026-10-07 Luna results](docs/testing/2026-10-07-luna-decisions/public-results.md) separate protocol/installation checks, controlled samples, and real main-model tasks. They retain the OpenRouter HTTP 403, two controlled approval misses, one later native approval success, log reduction, and ranking limits.

Interjection context and its Host projection omit raw tool arguments entirely while retaining tool names, call IDs and status. User/assistant text is still sent as before, without a blanket automatic-redaction guarantee; historical stage navigation maintains its own credential-redaction rules. See [behavior and limitations](README.md#behavior-and-limitations).

[简体中文](README.zh-CN.md)
