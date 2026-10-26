# 阶段 7 — 产品面（可选）

[English](07-product-surfaces.md) | 中文

仅在需要改 UI、Host、Desktop 或 SDK 时进入，否则可跳过。

## 产品面地图

| 方向 | 从这里开始 |
|---|---|
| Web Client | [web-client](../subsystems/web-client.zh.md)、[conversation](../subsystems/conversation.zh.md)、[slots](../subsystems/slots.zh.md)、`packages/client/` |
| Host / API | `packages/host/README.zh.md`、`packages/api/`、[typert](../subsystems/typert.zh.md) |
| Desktop | [apps/desktop/README.zh.md](../../apps/desktop/README.zh.md) 与架构中的 Desktop application 一节 |
| TypeScript / Python SDK | `packages/sdk/README.zh.md`、`python/README.zh.md`；profile `sdk` 与 `sdk-minimal` |
| 插件生态 | [动态 Cordis](../user/develop/practice/dynamic-cordis.zh.md)、boot 中的 Plugin Manager |

## 阅读提示

- Web 拥有 RPC 与流；Desktop 把本地页面接到已认证 Host。不要把 Electron 当成第二套 agent loop。
- Client UI 文案由 locale 拥有——见根 `AGENTS.md` 与 `verify-client-ui-i18n`。
- SDK 仍通过 `dsh --profile sdk`（或 `sdk-minimal`）启动；没有受支持的私有 Cordis 树旁路。

## 过关标准

- 接到 UI 或 SDK 任务时，先打开所属包组与子系统页，而不是在 `packages/` 里猜。

## 回到主线

只要产品改动碰到模型可见行为或共享 seam，就回到[一次完整 Turn](04-one-turn.zh.md)或[能力 Seam](05-capability-seams.zh.md)。
