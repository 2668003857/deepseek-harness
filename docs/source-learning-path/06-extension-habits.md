# Phase 6 — Extension habits

English | [中文](06-extension-habits.zh.md)

Turn reading into a repeatable change workflow. Expected effort: one to two days, interleaved with real work.

## Read

- [Extension cookbook](../cookbook/extension-cookbook.md)
- As needed: [adding a tool](../cookbook/adding-a-tool.md), [adding an LLM adapter](../cookbook/adding-an-llm-adapter.md), [adding a package](../cookbook/adding-a-package.md)
- [testing.md](../testing.md) — when snapshots and e2e are required
- [defensive-patterns/README.md](../defensive-patterns/README.md) — matching domain page before lifecycle or session edits

## Do

1. Pick one minimal real extension (new tool or LLM adapter) and complete every verify step in the matching cookbook.
2. Read one or two [implemented architecture Agent Notes](../../.agents/notes/implemented/architecture/) that touch your change (examples: system-prompt-as-surface, session-projection). Learn the tradeoff, not the PR history.

## Worked mini-extension: tool-result logger overlay

A learning overlay that does not ship in any profile. Create `scratch-plugin/src/tool-result-logger.ts`:

```ts
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-tools'

export const name = 'tool-result-logger'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.on('tools/post-execute', async (exec, _result, next) => {
    const decision = await next()
    console.log('[tool-result-logger]', exec.name)
    return decision
  })
}
```

Patch row (absolute path required):

```yaml
- insert:
    - id: tool-result-logger
      name: '/absolute/path/to/deepseek-harness/scratch-plugin/src/tool-result-logger.ts'
```

```sh
pnpm dsh --profile headless --patch ./scratch-plugin/cordis.yml "say hi"
```

Confirm the waterfall calls `next()`, registrations dispose on unload, and you did not edit `agent-loop`. For a production package, follow [adding-a-package](../cookbook/adding-a-package.md) and the testing policy instead of a scratch overlay.

## Pass criteria

- You can add a package or tool by cookbook and name the tests you owe.
- You treat Agent Notes as decision authority and archived notes as frozen history.

## Next

[Phase 7 — Product surfaces](07-product-surfaces.md) (optional)
