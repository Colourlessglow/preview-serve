import { defineCommand, runMain } from 'citty'
import defu from 'defu'
import { description, name, version } from '../package.json'
import { loadConfig } from './config'
import { createPreviewServer } from './serve'

export const ci = () => {
  const main = defineCommand({
    meta: {
      name,
      version,
      description,
    },
    args: {
      dist: {
        type: 'positional',
        description: '网页包路径',
        valueHint: 'dist',
        required: false,
      },
      baseURL: {
        type: 'string',
        description: '基础路径',
        valueHint: '/',
      },
    },
    async run({ args }) {
      const config = await loadConfig()
      await createPreviewServer(defu({ dist: args.dist, baseURL: args.baseURL }, config))
    },
  })

  runMain(main)
}
