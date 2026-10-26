# 阶段 6 — 扩展习惯

[English](06-extension-habits.md) | 中文

把阅读变成可重复的改动工作流。建议投入：一到两天，可与真实工作穿插。

## 读

- [扩展实操手册](../cookbook/extension-cookbook.zh.md)
- 按需：[新增 Tool](../cookbook/adding-a-tool.zh.md)、[新增 LLM Adapter](../cookbook/adding-an-llm-adapter.zh.md)、[新增 Package](../cookbook/adding-a-package.zh.md)
- [testing.zh.md](../testing.zh.md) — 何时需要 snapshot 与 e2e
- [defensive-patterns/README.zh.md](../defensive-patterns/README.zh.md) — 改生命周期或会话前打开对应域页面

## 做

1. 选一个最小真实扩展（新工具或 LLM 适配器），按对应 cookbook 做完每一步 verify。
2. 读一到两篇与你改动相关的 [implemented architecture Agent Notes](../../.agents/notes/implemented/architecture/)（例如 system-prompt-as-surface、session-projection）。学权衡，不学 PR 流水账。

## 参考：迷你扩展 — tool-result 日志 overlay

仅供学习的 overlay，不进入任何 profile。创建 `scratch-plugin/src/tool-result-logger.ts`：

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

Patch 行（路径必须是绝对路径）：

```yaml
- insert:
    - id: tool-result-logger
      name: '/absolute/path/to/deepseek-harness/scratch-plugin/src/tool-result-logger.ts'
```

```sh
pnpm dsh --profile headless --patch ./scratch-plugin/cordis.yml "say hi"
```

确认 waterfall 调用了 `next()`、卸载时注册会释放、并且你没有改 `agent-loop`。若要做成正式包，请走 [adding-a-package](../cookbook/adding-a-package.zh.md) 与测试策略，而不是 scratch overlay。

## 过关标准

- 能按 cookbook 新增包或工具，并说出该跑哪些测试。
- 把 Agent Notes 当作决策权威，把 archived 笔记当作冻结历史。

## 下一步

[阶段 7 — 产品面](07-product-surfaces.zh.md)（可选）
