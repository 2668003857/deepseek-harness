# Phase 2 — Profiles and bundles

English | [中文](02-profiles-and-bundles.zh.md)

A running `dsh` is an ordered stack of Cordis patches. Expected effort: about one day.

## Read

- [architecture.md](../architecture.md) — Cordis, Profiles and bundles, Application launch
- [packages/bundle/README.md](../../packages/bundle/README.md)
- [packages/bundle/base/README.md](../../packages/bundle/base/README.md) and the full [`cordis.patch.yml`](../../packages/bundle/base/cordis.patch.yml)
- One mode overlay: [`web-app/cordis.patch.yml`](../../packages/bundle/web-app/cordis.patch.yml) or [`headless/cordis.patch.yml`](../../packages/bundle/headless/cordis.patch.yml)
- [packages/boot/app-boot/README.md](../../packages/boot/app-boot/README.md) and `src/profile.ts` (`PROFILE_TEMPLATES`)
- Generated graph: [apps/cli/composition.md](../../apps/cli/composition.md)
- CLI entry: `apps/cli/src/bin.ts` → profile boot

## Do

```sh
pnpm dsh --profile headless --dump-config
```

Mark ten ids you recognize. Compare a headless-patched row (for example `hmr` disabled) with the same id in `dsh-base`.

## Worked composition

| Profile | Bundles |
|---|---|
| `web` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-web-app` |
| `headless` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-headless` |
| `sdk` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-sdk-app` |
| `acp` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-acp-app` |
| `sdk-minimal` | `@deepseek-ai/dsh-sdk-minimal` only (no base) |

Layers apply to an empty entry list: ordered bundles → profile `cordis.patch.yml` → home patch → `--patch` overlays. A patch replaces a whole row by `id`, or inserts new rows.

## Annotated `dump-config` (headless excerpt)

Comments name why a learner should care about the row. Re-run the command; ids stay stable even when neighboring rows move.

```yaml
# == @deepseek-ai/dsh-base
- id: llm                 # ctx.llm adapter registry
- id: session             # append-only SessionEvent log
- id: agent               # ctx.agents live registry
- id: user-questions      # ask-user seam used by tool-ask-user
- id: session-persistence-jsonl
- id: subprocess
- id: sandbox
- id: tool-bash           # model-facing Bash Consumer
- id: tool-fs
- id: system-prompt
- id: tools
- id: agent-loop          # default Agent driver
# == @deepseek-ai/dsh-base, patched by @deepseek-ai/dsh-headless
- id: hmr
  disabled: true          # headless turns HMR off
# == @deepseek-ai/dsh-headless
- id: headless-runner     # one-shot runner; web profile mounts web-app instead
```

## Pass criteria

- Draw `web = base + web-app`, `headless = base + headless`, and the `sdk-minimal` exception.
- Explain that a patch targets a row by `id` and replaces its whole config.

## Next

[Phase 3 — First Harness plugin](03-first-plugin.md)
