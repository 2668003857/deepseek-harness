# Phase 1 — Cordis runtime

English | [中文](01-cordis.zh.md)

Without Cordis, every `packages/` plugin looks like unexplained magic. Expected effort: one to two days. No API key required.

## Read and do

1. [Cordis primer](../cordis-primer.md) — concept cheat sheet
2. [Cordis tutorial](../cordis-tutorial/index.md) chapters 01–07 end to end in `tmp/cordis-tutorial/`
3. Look up `ctx.effect`, `inject`, and event dispatch in [Cordis core API — Context](../cordis-api/context.md)

## Source skimming (after the tutorial)

Skim only the Cordis entry and `Context` types under `vendor/cordis/`. Do not read the whole vendor tree.

## Three rules that appear everywhere later

1. **Registrations are effects** — `ctx.effect()` / `ctx.on()`; a registry `register()` returns a disposer that runs on unload.
2. **Waterfall listeners must call `next()`** — returning without it short-circuits the chain.
3. **A capability seam has three roles** — Service Definition, Service Provider, and Consumer. One role alone is not a seam.

## Pass criteria

- Write a small plugin with validated `Config`, a service on `ctx`, and an event listener without copying the tutorial file by file.
- Explain roughly how composition and HMR load and unload a row.

## Next

[Phase 2 — Profiles and bundles](02-profiles-and-bundles.md)
