# 阶段 0 — 仓库地图

[English](00-repository-map.md) | 中文

在阅读 `packages/` 之前先建立布局与术语。建议投入：半天到一天。

## 读

- [README.zh.md](../../README.zh.md) — 从源码运行
- [development.zh.md](../development.zh.md) — 搭建与日常命令
- 根 [AGENTS.md](../../AGENTS.md) — 只看 **Repository layout** 与 **Conventions**
- [glossary.zh.md](../glossary.zh.md) — 记住 seam、turn、step、scope、profile、bundle
- [packages/README.zh.md](../../packages/README.zh.md) — 包分组表

## 做

```sh
pnpm install
pnpm run typecheck
```

浏览 `packages/` 一层目录，对照分组表，暂不深入每个包。

## 参考：包分组地图

| 分组 | 职责（学习视角） |
|---|---|
| `core/` | Session 日志、system prompt、工具注册表、agent 句柄、agent-loop 驱动、scope |
| `bundle/` | 可安装的 profile 层（`dsh-base`、`web-app`、`headless` 等） |
| `boot/` | 应用启动、profile 模板、插件管理 |
| `llm/` | `ctx.llm` 词汇与提供方适配器 |
| `shell/` + `subprocess/` + `sandbox/` + `fs/` | Bash / PTY / 文件工具背后的共享执行世界 |
| `session/` | 持久化、投影、标题、工作目录 |
| `interaction/` | 审批、ask-user、人类命令 |
| `client/` + `host/` | Web GUI 两端 |
| `sdk/` + `acp/` | 进程外自动化入口 |
| `experimental/` | 评估中能力，无产品支持承诺 |

应用只能通过命名的 `dsh` profile 启动（`web`、`headless`、`sdk`、`sdk-minimal`、`acp`）。包 bin 与 demo 不是受支持的 Node 应用启动器——见[架构 — 应用启动](../architecture.zh.md#application-launch)。

## 过关标准

- 能用一句话分别说出 `core/`、`bundle/`、`boot/`、`llm/` 各自管什么。
- 能说出受支持的 Node 应用通过 `dsh --profile <name>`（或 `dsh <name>`）启动。

## 下一步

[阶段 1 — Cordis 运行时](01-cordis.zh.md)
