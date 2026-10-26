# 阶段 2 — Profile 与 Bundle

[English](02-profiles-and-bundles.md) | 中文

一次运行中的 `dsh` 是有序堆叠的 Cordis patch。建议投入：约一天。

## 读

- [architecture.zh.md](../architecture.zh.md) — Cordis、Profiles and bundles、Application launch
- [packages/bundle/README.zh.md](../../packages/bundle/README.zh.md)
- [packages/bundle/base/README.zh.md](../../packages/bundle/base/README.zh.md) 与整份 [`cordis.patch.yml`](../../packages/bundle/base/cordis.patch.yml)
- 任选一个模式叠层：[`web-app/cordis.patch.yml`](../../packages/bundle/web-app/cordis.patch.yml) 或 [`headless/cordis.patch.yml`](../../packages/bundle/headless/cordis.patch.yml)
- [packages/boot/app-boot/README.zh.md](../../packages/boot/app-boot/README.zh.md) 与 `src/profile.ts`（`PROFILE_TEMPLATES`）
- 生成图：[apps/cli/composition.md](../../apps/cli/composition.md)
- CLI 入口：`apps/cli/src/bin.ts` → profile boot

## 做

```sh
pnpm dsh --profile headless --dump-config
```

标出十个你认识的 `id`。对照被 headless 改写的行（例如禁用的 `hmr`）与 `dsh-base` 中的同 id。

## 参考：组合关系

| Profile | Bundles |
|---|---|
| `web` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-web-app` |
| `headless` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-headless` |
| `sdk` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-sdk-app` |
| `acp` | `@deepseek-ai/dsh-base` + `@deepseek-ai/dsh-acp-app` |
| `sdk-minimal` | 仅 `@deepseek-ai/dsh-sdk-minimal`（不含 base） |

层作用在空入口列表上：有序 bundles → profile 的 `cordis.patch.yml` → home patch → `--patch` 覆盖。patch 按 `id` 整行替换，或插入新行。

## 参考：批注过的 `dump-config`（headless 摘录）

注释说明学习者为何应关心该行。请重新运行命令；邻近行可能移动，但 id 保持稳定。

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

## 过关标准

- 能画出 `web = base + web-app`、`headless = base + headless`，以及 `sdk-minimal` 例外。
- 能说明 patch 按 `id` 定位一行并替换整份 config。

## 下一步

[阶段 3 — 第一个 Harness 插件](03-first-plugin.zh.md)
