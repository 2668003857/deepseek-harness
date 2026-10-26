# Phase 5 — Capability seams

English | [中文](05-capability-seams.zh.md)

Learn the three-role pattern on a few complete samples instead of every subsystem. Expected effort: two to three days.

## Read

- [capability-seams.md](../capability-seams.md) — generated graph overview
- [Practice — capability layers](../user/develop/practice/index.md)
- [architecture.md — Where new behavior goes](../architecture.md#where-new-behavior-goes)

## Required sample 1 — Shell triad

| Role | Package | Path | `ctx` |
|---|---|---|---|
| Service Definition | `@deepseek-ai/dsh-shell` | `packages/shell/shell/` | `ctx.shell` |
| Service Provider | `@deepseek-ai/dsh-bash-local` (and sandbox variants) | `packages/shell/bash-local/` | registers into `ctx.shell` |
| Consumer | `@deepseek-ai/dsh-tool-bash` | `packages/shell/tool-bash/` | registers on `ctx.tools` |

Skim READMEs for `subprocess`, `sandbox`, and `fs`. One provider swap moves Bash, PTY, and LSP together because they share one execution world.

## Required sample 2 — Approval and ask-user

- Approval seam: blocks or audits tool execution under policy — start from `docs/subsystems/approval.md` and the `approval` row in base.
- Ask-user: [`tool-ask-user`](../../packages/interaction/tool-ask-user/src/index.ts) pauses until `ctx.userQuestions` returns — human answers re-enter the loop as ordinary tool results.

## Required sample 3 — Persistence

- [persistence subsystem](../subsystems/persistence.md)
- JSONL provider under `packages/session/` — generation files are never renamed, replaced, or deleted; migrations publish a version-named successor beside the source.

## Pick one optional line

Choose only one:

- Subagent / Agent Teams — `docs/subsystems/subagent.md`, `agent-team.md`
- Compaction / context — `compaction.md`, `packages/context/`
- MCP — `docs/subsystems/mcp.md`
- Credentials + Settings — matching subsystem pages

## Worked “where does X go?” answers

| Goal | Mechanism |
|---|---|
| New model provider | Register adapter on `ctx.llm` |
| New model-facing capability | Register on `ctx.tools`; schema joins prompt assembly |
| New shell backend | Register `ctx.shell` provider; local spawn goes through `ctx.subprocess` |
| Intercept a request or tool | `agent/*` or `tools/*` waterfall; `agent/turn-stopping` stops a turn |
| New model-visible context | `agent.inject()` and/or a new session event — never a silent side channel |

## Pass criteria

- Given “I want to add X”, name `ctx.?`, whether a new session event is required, and whether a bundle patch row is enough.

## Next

[Phase 6 — Extension habits](06-extension-habits.md)
