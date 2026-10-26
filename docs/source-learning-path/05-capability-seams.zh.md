# 阶段 5 — 能力 Seam

[English](05-capability-seams.md) | 中文

用几个完整样板建立三角色心智，不要平铺所有子系统。建议投入：两到三天。

## 读

- [capability-seams.zh.md](../capability-seams.zh.md) — 生成图鸟瞰
- [实战 — 能力分层](../user/develop/practice/index.zh.md)
- [architecture.zh.md — 新行为的归属位置](../architecture.zh.md#where-new-behavior-goes)

## 必读样板 1 — Shell 三角色

| 角色 | 包 | 路径 | `ctx` |
|---|---|---|---|
| Service Definition | `@deepseek-ai/dsh-shell` | `packages/shell/shell/` | `ctx.shell` |
| Service Provider | `@deepseek-ai/dsh-bash-local`（及 sandbox 变体） | `packages/shell/bash-local/` | 注册进 `ctx.shell` |
| Consumer | `@deepseek-ai/dsh-tool-bash` | `packages/shell/tool-bash/` | 注册到 `ctx.tools` |

扫读 `subprocess`、`sandbox`、`fs` 的 README。换一个 provider，Bash、PTY、LSP 会一起走，因为它们共享同一执行世界。

## 必读样板 2 — Approval 与 ask-user

- Approval seam：在策略下拦截或审计工具执行——从 `docs/subsystems/approval.zh.md` 与 base 中的 `approval` 行开始。
- Ask-user：[`tool-ask-user`](../../packages/interaction/tool-ask-user/src/index.ts) 等待 `ctx.userQuestions` 返回——人类回答作为普通工具结果回到循环。

## 必读样板 3 — Persistence

- [persistence 子系统](../subsystems/persistence.zh.md)
- `packages/session/` 下的 JSONL 提供方——世代文件永不重命名、替换或删除；迁移在源旁发布带版本名的 successor。

## 选读一条线

只选一条：

- Subagent / Agent Teams — `docs/subsystems/subagent.zh.md`、`agent-team.zh.md`
- Compaction / context — `compaction.zh.md`、`packages/context/`
- MCP — `docs/subsystems/mcp.zh.md`
- Credentials + Settings — 对应子系统页

## 参考：「X 该挂哪？」

| 目标 | 机制 |
|---|---|
| 新模型提供方 | 在 `ctx.llm` 上注册适配器 |
| 新的面向模型能力 | 在 `ctx.tools` 上注册；schema 加入提示词组装 |
| 新的 shell 后端 | 注册 `ctx.shell` 提供方；本地 spawn 经 `ctx.subprocess` |
| 拦截请求或工具 | `agent/*` 或 `tools/*` waterfall；`agent/turn-stopping` 停止轮次 |
| 新的模型可见上下文 | `agent.inject()` 和/或新的 session 事件——禁止静默旁路 |

## 过关标准

- 给定「我想加 X」，能指出 `ctx.?`、是否需要新的 session 事件、是否一行 bundle patch 就够。

## 下一步

[阶段 6 — 扩展习惯](06-extension-habits.zh.md)
