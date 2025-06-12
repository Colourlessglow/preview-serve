import { readFile, stat } from 'node:fs/promises'
import type { H3Event, H3Plugin } from 'h3'
import { definePlugin, serveStatic as serveStatic$2 } from 'h3'
import { lookup as mime } from 'mrmime'
import { join } from 'pathe'
import type { ResolveOptions } from '../types'

/**
 * 静态文件服务
 * @param event h3 event
 * @param dist 静态文件路径
 * @param file 文件映射
 * @param fallthrough When set to true, the function will not throw 404 error when the asset meta is not found or meta validation failed
 * @returns
 */
const serveStatic$1 = (
  event: H3Event,
  dist: string,
  file?: (id: string) => string,
  fallthrough?: boolean
) => {
  return serveStatic$2(event, {
    getContents: (id) => readFile(join(dist, file ? file(id) : id)),
    getMeta: async (id) => {
      const name = join(dist, file ? file(id) : id)
      const stats = await stat(name).catch(() => {})
      if (!stats || !stats.isFile()) {
        return
      }
      return {
        size: stats.size,
        mtime: stats.mtimeMs,
        type: mime(name)!,
      }
    },
    fallthrough,
  })
}

/**
 * 新增静态文件服务
 * @param options 解析后的配置项
 */
export const serveStatic: (options: Pick<ResolveOptions, 'dist'>) => H3Plugin = definePlugin<
  Pick<ResolveOptions, 'dist'>
>((h3, options) => {
  h3.use(async (event) => {
    const hasNormal = await serveStatic$1(event, options.dist, (id) => id, true)
    if (hasNormal) {
      return hasNormal
    }
    const hasHtml = await serveStatic$1(event, options.dist, (id) => id + '.html', true)
    if (hasHtml) {
      return hasHtml
    }
    const indexHtml = await serveStatic$1(event, options.dist, () => 'index.html')
    return indexHtml
  })
})
