# Phase 4 — One turn end to end

English | [中文](04-one-turn.zh.md)

This is the most important reading in the path. Expected effort: three to five days. Order: behavior docs → types → driver implementation, then draw your own sequence diagram.

## Behavior map

- [architecture.md](../architecture.md) — Turn flow, Session log, Events, Core packages
- [agent-lifecycle.md](../agent-lifecycle.md) — sequence diagram
- [tool-execution-pipeline.md](../tool-execution-pipeline.md)
- [event-producer-consumer.md](../event-producer-consumer.md) — lookup table, not a novel

## Source reading order

| Order | Package | Open first |
|---|---|---|
| 1 | session | `packages/core/session/README.md`, `src/types.ts` (`SessionEventMap`), `deriveMessages` |
| 2 | system-prompt | `packages/core/system-prompt/` README + `src/index.ts` |
| 3 | tools | `packages/core/tools/` pre / execute / post pipeline |
| 4 | llm | `packages/llm/llm/` README, types, stream, adapter registration |
| 5 | agent | `packages/core/agent/` handle, inbox, `agent/*` events |
| 6 | agent-loop | README → `src/index.ts` → `src/agent.ts` (`ReactLoopAgent`) |
| 7 | scope | `packages/core/scope/` — per-agent registration |

Subsystem type pages (lookup, not story): [core](../subsystems/core.md), [session](../subsystems/session.md), [tools](../subsystems/tools.md), [llm-streaming](../subsystems/llm-streaming.md), [system-prompt](../subsystems/system-prompt.md).

## Worked turn sequence

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

## Durable vs live events

**Durable session events** (survive reload; reconstruct model history):

- `turn/*`, `step/*`
- `system/message`, `user/message`
- `assistant/message`, `assistant/attempt`
- `tool/*`

**Live extension points** (process-local unless also logged):

- `agent/pre-step`, `agent/request`, `agent/turn-stopping`
- `llm/stream`, `agent/assistant-stream`
- `tools/pre-execute`, `tools/execute`, `tools/post-execute`

Waterfalls (`agent/pre-step`, `agent/request`, `llm/stream`, `tools/*`) must call `next()`. `agent/turn-stopping` is serial and has no `next()`.

## Optional live check

With `DEEPSEEK_API_KEY` set:

```sh
pnpm dsh --profile headless "write a file hello.txt"
```

Open the session log and match event order to your diagram.

## Pass criteria

- Your diagram covers claim → assemble → stream → tools → turn end.
- You can mark durable vs live names on `SessionEventMap` and the agent/tool event maps.
- Motto: **Model-visible ⟺ logged.** Ask “event or agent-loop change?” before editing the loop.

## Next

[Phase 5 — Capability seams](05-capability-seams.md)
