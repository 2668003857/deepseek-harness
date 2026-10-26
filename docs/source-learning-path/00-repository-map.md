# Phase 0 — Repository map

English | [中文](00-repository-map.zh.md)

Establish the layout and vocabulary before reading `packages/`. Expected effort: half a day to one day.

## Read

- [README.md](../../README.md) — run from source
- [development.md](../development.md) — setup and daily commands
- Root [AGENTS.md](../../AGENTS.md) — only **Repository layout** and **Conventions**
- [glossary.md](../glossary.md) — memorize seam, turn, step, scope, profile, bundle
- [packages/README.md](../../packages/README.md) — package-group table

## Do

```sh
pnpm install
pnpm run typecheck
```

Walk one level of `packages/` and match each directory name to the group table. Do not open every package yet.

## Worked package map

| Group | Owns (learner view) |
|---|---|
| `core/` | Session log, system prompt, tools registry, agent handle, agent-loop driver, scope |
| `bundle/` | Installable profile layers (`dsh-base`, `web-app`, `headless`, …) |
| `boot/` | App launch, profile templates, plugin manager |
| `llm/` | `ctx.llm` vocabulary and provider adapters |
| `shell/` + `subprocess/` + `sandbox/` + `fs/` | Shared execution world behind Bash / PTY / file tools |
| `session/` | Persistence, projection, titles, working directory |
| `interaction/` | Approval, ask-user, human commands |
| `client/` + `host/` | Web GUI halves |
| `sdk/` + `acp/` | Out-of-process automation entry points |
| `experimental/` | Evaluated capabilities without product-support commitment |

Applications launch only through named `dsh` profiles (`web`, `headless`, `sdk`, `sdk-minimal`, `acp`). Package bins and demos are not supported Node app launchers — see [architecture — Application launch](../architecture.md#application-launch).

## Pass criteria

- Name what `core/`, `bundle/`, `boot/`, and `llm/` own in one sentence each.
- State that supported Node apps start with `dsh --profile <name>` (or `dsh <name>`).

## Next

[Phase 1 — Cordis runtime](01-cordis.md)
