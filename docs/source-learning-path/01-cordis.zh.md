# 阶段 1 — Cordis 运行时

[English](01-cordis.md) | 中文

不懂 Cordis，读 `packages/` 会处处卡住。建议投入：一到两天。不需要 API key。

## 读 + 做

1. [Cordis 入门](../cordis-primer.zh.md) — 概念速查
2. [Cordis 教程](../cordis-tutorial/index.zh.md) 第 01–07 章，在 `tmp/cordis-tutorial/` 里动手做完
3. 在 [Cordis 核心 API — Context](../cordis-api/context.zh.md) 查阅 `ctx.effect`、`inject` 与事件分发

## 源码点读（教程完成之后）

只扫 `vendor/cordis/` 的入口与 `Context` 相关类型。不要通读整棵 vendor。

## 后面源码到处出现的三条铁律

1. **注册都是 effect** — `ctx.effect()` / `ctx.on()`；注册表的 `register()` 返回卸载时运行的 disposer。
2. **waterfall 监听器必须调用 `next()`** — 不调用就短路整条链。
3. **能力 seam 有三个角色** — Service Definition、Service Provider、Consumer。单独一个角色不是 seam。

## 过关标准

- 能不逐文件照抄教程，写出带校验 `Config`、挂在 `ctx` 上的服务、以及事件监听的小插件。
- 能大致说明组合与 HMR 如何加载和卸载一行配置。

## 下一步

[阶段 2 — Profile 与 Bundle](02-profiles-and-bundles.zh.md)
