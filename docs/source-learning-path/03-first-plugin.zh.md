# 阶段 3 — 第一个 Harness 插件

[English](03-first-plugin.md) | 中文

在读循环之前，先把 Cordis 接到产品 `ctx` 上。建议投入：一到两天。

## 做（跟教程动手，不要只看）

1. [第一个插件](../user/develop/basic/index.zh.md) — 用 `--patch` 加载插件
2. [开发一个工具](../user/develop/basic/tool.zh.md) — 最小 `greet`
3. [插件配置](../user/develop/basic/config.zh.md) — Schemastery `Config`
4. 选读：[框架 — 服务](../user/develop/framework/service.zh.md) 与[事件](../user/develop/framework/events.zh.md)

## 源码对照

把 [`packages/interaction/tool-ask-user/src/index.ts`](../../packages/interaction/tool-ask-user/src/index.ts) 和你的 `greet` 插件并排放：

| 模式 | `greet`（教程） | `tool-ask-user`（已发布） |
|---|---|---|
| `inject` | `['tools']` | `['tools', 'userQuestions']` |
| 注册 | `ctx.tools.register(defineTool({…}))` | 相同，另有可选 timed 模式 |
| `execute` | 纯字符串返回 | 调用 `ctx.userQuestions.ask(…)` 并映射答案 |
| 角色 | 仅消费 `ctx.tools` | 同时消费 tools **与** ask-user seam |

再读 [packages/core/tools/README.zh.md](../../packages/core/tools/README.zh.md) 与 `src/index.ts`，弄清 `defineTool` / `ctx.tools`。

## 参考：最小工具（与教程同形）

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

在 patch 文件里用绝对路径挂载，然后：

```sh
pnpm dsh web --patch ./scratch-plugin/cordis.yml
# or, for a one-shot run once you have a key:
# pnpm dsh --profile headless --patch ./scratch-plugin/cordis.yml "Use greet to greet Ada"
```

工具 schema 经 `ctx.systemPrompt` 在 tools 服务贡献 provider 结果时进入提示词组装——阶段 4 会顺着这条链读下去。

## 过关标准

- 你的 `--patch` 工具能在 web 或 headless 中加载。
- 能指出已注册工具在何处变成模型可见的 schema。

## 下一步

[阶段 4 — 一次完整 Turn](04-one-turn.zh.md)
