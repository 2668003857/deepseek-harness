# 阶段 4 — 一次完整 Turn

[English](04-one-turn.md) | 中文

整条路径里最重要的阅读。建议投入：三到五天。顺序：行为文档 → 类型 → 驱动实现，然后自己画时序图。

## 行为地图

- [architecture.zh.md](../architecture.zh.md) — Turn flow、Session log、Events、Core packages
- [agent-lifecycle.zh.md](../agent-lifecycle.zh.md) — 序列图
- [tool-execution-pipeline.zh.md](../tool-execution-pipeline.zh.md)
- [event-producer-consumer.zh.md](../event-producer-consumer.zh.md) — 当索引查表，不当小说读

## 源码阅读顺序

| 顺序 | 包 | 先打开 |
|---|---|---|
| 1 | session | `packages/core/session/README.zh.md`、`src/types.ts`（`SessionEventMap`）、`deriveMessages` |
| 2 | system-prompt | `packages/core/system-prompt/` README + `src/index.ts` |
| 3 | tools | `packages/core/tools/` 的 pre / execute / post 管道 |
| 4 | llm | `packages/llm/llm/` README、types、stream、适配器注册 |
| 5 | agent | `packages/core/agent/` 句柄、inbox、`agent/*` 事件 |
| 6 | agent-loop | README → `src/index.ts` → `src/agent.ts`（`ReactLoopAgent`） |
| 7 | scope | `packages/core/scope/` — 按 agent 限定注册 |

子系统类型页（查类型，不替代架构故事）：[core](../subsystems/core.zh.md)、[session](../subsystems/session.zh.md)、[tools](../subsystems/tools.zh.md)、[llm-streaming](../subsystems/llm-streaming.zh.md)、[system-prompt](../subsystems/system-prompt.zh.md)。

## 参考：Turn 时序

```mermaid
sequenceDiagram
  participant Loop as AgentLoop
  participant Prompt as SystemPrompt
  participant Llm as ctx.llm
  participant Tools as ctx.tools
  participant Log as SessionLog

  Loop->>Log: turn/start
  Loop->>Loop: agent/pre-step claim input
  Loop->>Prompt: assemble sections and tool schemas
  Loop->>Loop: agent/request prepareCall
  Loop->>Log: system/message user/message
  Loop->>Llm: llm/stream
  Llm-->>Loop: agent/assistant-stream chunks
  Loop->>Log: assistant/message or assistant/attempt
  Loop->>Tools: tools/pre-execute execute post-execute
  Tools-->>Log: tool/call tool/result
  Loop->>Log: step/end
  Loop->>Loop: agent/turn-stopping
  Loop->>Log: turn/end
```

## Durable 与 live 事件

**Durable session 事件**（重启后仍在；用于重建模型历史）：

- `turn/*`、`step/*`
- `system/message`、`user/message`
- `assistant/message`、`assistant/attempt`
- `tool/*`

**Live 扩展点**（进程内；除非另行记入日志）：

- `agent/pre-step`、`agent/request`、`agent/turn-stopping`
- `llm/stream`、`agent/assistant-stream`
- `tools/pre-execute`、`tools/execute`、`tools/post-execute`

Waterfall（`agent/pre-step`、`agent/request`、`llm/stream`、`tools/*`）必须调用 `next()`。`agent/turn-stopping` 是 serial，没有 `next()`。

## 可选实跑

设置 `DEEPSEEK_API_KEY` 后：

```sh
pnpm dsh --profile headless "write a file hello.txt"
```

打开 session 日志，把事件顺序与你的图对照。

## 过关标准

- 你的图覆盖 claim → assemble → stream → tools → turn end。
- 能在 `SessionEventMap` 与 agent/tool 事件图上标出 durable 与 live。
- 口诀：**模型可见 ⟺ 已记入日志。** 改循环前先问「该挂事件还是改 agent-loop」。

## 下一步

[阶段 5 — 能力 Seam](05-capability-seams.zh.md)
