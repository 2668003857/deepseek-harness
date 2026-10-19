import type { Context } from '@deepseek-ai/cordis'

export const name = 'consumer'
export const inject = ['greeter']

export function apply(ctx: Context) {
    // undefined when no provider is loaded; the plugin still runs.
    const greeter = ctx.get('greeter')
    console.log(greeter?.greet('maybe') ?? 'no greeter available')
}
