import { defineCommand, runMain } from 'citty'
import defu from 'defu'
import { description, name, version } from '../package.json' with { type: 'json' }
import { loadConfig } from './config'
import { createPreviewServer } from './serve'

/**
 * ci 命令
 */
export const ci = (): void => {
  const main = defineCommand({
    meta: {
      name,
      version,
      description,
    },
    args: {
      dist: {
        type: 'positional',
        description: 'web打包路径',
        valueHint: 'dist',
        required: false,
      },
    },
    async run({ args }) {
      const config = await loadConfig()
      createPreviewServer(defu({ dist: args.dist }, config))
    },
  })

  runMain(main)
}
