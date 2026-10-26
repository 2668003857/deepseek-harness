# Phase 3 — First Harness plugin

English | [中文](03-first-plugin.zh.md)

Attach Cordis to the product `ctx` before reading the loop. Expected effort: one to two days.

## Do (follow the tutorials; do not only read)

1. [Your first plugin](../user/develop/basic/index.md) — load a plugin with `--patch`
2. [Build a tool](../user/develop/basic/tool.md) — minimal `greet`
3. [Plugin config](../user/develop/basic/config.md) — Schemastery `Config`
4. Optional: [framework — services](../user/develop/framework/service.md) and [events](../user/develop/framework/events.md)

## Source comparison

Open [`packages/interaction/tool-ask-user/src/index.ts`](../../packages/interaction/tool-ask-user/src/index.ts) beside your `greet` plugin:

| Pattern | `greet` (tutorial) | `tool-ask-user` (shipped) |
|---|---|---|
| `inject` | `['tools']` | `['tools', 'userQuestions']` |
| Registration | `ctx.tools.register(defineTool({…}))` | same, plus optional timed mode |
| `execute` | Pure string return | Calls `ctx.userQuestions.ask(…)` and maps answers |
| Role | Consumer of `ctx.tools` only | Consumer of tools **and** the ask-user seam |

Also read [packages/core/tools/README.md](../../packages/core/tools/README.md) and `src/index.ts` for `defineTool` / `ctx.tools`.

## Worked minimal tool (same shape as the tutorial)

```ts
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'greet-tool'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'greet',
    description: 'Greet someone by name.',
    parameters: {
      name: { type: 'string', required: true, description: 'The name to greet' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      return `Hello, ${args.name}!`
    },
  }))
}
```

Mount with an absolute path in a patch file, then:

```sh
pnpm dsh web --patch ./scratch-plugin/cordis.yml
# or, for a one-shot run once you have a key:
# pnpm dsh --profile headless --patch ./scratch-plugin/cordis.yml "Use greet to greet Ada"
```

Tool schemas join prompt assembly through `ctx.systemPrompt` when the tools service contributes provider results — follow that link in phase 4.

## Pass criteria

- Your `--patch` tool loads in web or headless.
- You can point to where a registered tool becomes model-visible schema.

## Next

[Phase 4 — One turn end to end](04-one-turn.md)
