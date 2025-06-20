import { consola } from 'consola'
import { colors } from 'consola/utils'
import { loadConfig as loadConfig$1 } from 'esconf'
import { presetMini } from 'esconf/preset-mini'
import { join } from 'pathe'
import type { Options, ResolveOptions } from './types'

/**
 * 配置项帮助方案
 * @param options 配置项
 */
export const defineConfig = (options?: Options): Options => options || {}

/**
 * 加载配置文件
 */
export const loadConfig = async (): Promise<Options> => {
  const { config, layers } = await loadConfig$1<Options>({
    presets: [presetMini({ name: 'preview', configName: 'config' })],
    default: {},
  })
  const configFile = layers
    .filter((item) => item.config)
    .map((item) => item.name)
    .join(',')
  if (configFile) {
    consola.log('load config file:', colors.bold(configFile))
  }
  return config
}

export const resolveOptions = (options?: Options): ResolveOptions => {
  const { cwd, dist, proxy, ...server } = options || {}
  const _options: ResolveOptions = {
    cwd: cwd || process.cwd(),
    server: {
      port: process.env.PORT || 3000,
      ...server,
    },
    proxy: {
      ...proxy,
    },
    dist: dist || 'dist',
  }
  return {
    ..._options,
    dist: join(_options.cwd, _options.dist),
  }
}
