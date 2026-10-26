# Phase 7 — Product surfaces (optional)

English | [中文](07-product-surfaces.zh.md)

Enter only when you need UI, Host, Desktop, or SDK work. Skip otherwise.

## Surface map

| Direction | Start here |
|---|---|
| Web Client | [web-client](../subsystems/web-client.md), [conversation](../subsystems/conversation.md), [slots](../subsystems/slots.md), `packages/client/` |
| Host / API | `packages/host/README.md`, `packages/api/`, [typert](../subsystems/typert.md) |
| Desktop | [apps/desktop/README.md](../../apps/desktop/README.md) and architecture § Desktop application |
| TypeScript / Python SDK | `packages/sdk/README.md`, `python/README.md`; profiles `sdk` and `sdk-minimal` |
| Plugin ecosystem | [Dynamic Cordis](../user/develop/practice/dynamic-cordis.md), Plugin Manager in boot |

## Reading tips

- Web owns RPC and streams; Desktop connects a local page to an authenticated Host. Do not treat Electron as a second agent loop.
- Client UI copy is locale-owned — see root `AGENTS.md` and `verify-client-ui-i18n`.
- SDK launch still goes through `dsh --profile sdk` (or `sdk-minimal`); there is no supported private Cordis tree escape hatch.

## Pass criteria

- For a UI or SDK task, you open the owning package group and subsystem page before guessing across `packages/`.

## Back to the spine

Return to [One turn](04-one-turn.md) or [Capability seams](05-capability-seams.md) whenever a product change touches model-visible behavior or a shared seam.
