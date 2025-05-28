import { readFile, stat } from 'node:fs/promises'
import type { App, EventHandlerRequest, H3Event } from 'h3'
import { eventHandler, serveStatic as serveStatic$1 } from 'h3'
import { join } from 'pathe'
import mime from 'mime'
import type { ResolveOptions } from './types'

/**
 * 静态文件服务
 * @param event h3 event
 * @param dist 静态文件路径
 * @param file 文件映射
 * @param fallthrough When set to true, the function will not throw 404 error when the asset meta is not found or meta validation failed
 * @returns
 */
const serveStatic = (
  event: H3Event<EventHandlerRequest>,
  dist: string,
  file?: (id: string) => string,
  fallthrough?: boolean
) => {
  return serveStatic$1(event, {
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
        type: mime.getType(name)!,
      }
    },
    fallthrough,
  })
}

/**
 * 新增静态文件服务
 * @param app h3 应用
 * @param options 解析后的配置项
 */
export const addStatic = (app: App, options: ResolveOptions) => {
  app.use(
    '/',
    eventHandler(async (event) => {
      const hasNormal = await serveStatic(event, options.dist, (id) => id, true)
      if (hasNormal) {
        return
      }
      const hasHtml = await serveStatic(event, options.dist, (id) => id + '.html', true)
      if (hasHtml) {
        return
      }
      return serveStatic(event, options.dist, () => 'index.html')
    })
  )
}
