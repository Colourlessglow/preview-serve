import { consola } from 'consola'
import { colors } from 'consola/utils'
import { H3, getRequestURL, serve } from 'h3'
import { resolveOptions } from './config'
import { proxy, serveStatic } from './h3'
import type { Options, Server } from './types'

/**
 * 创建预览服务
 * @param options 配置项
 * @returns
 */
export const createPreviewServer = (options?: Options): Server => {
  const resolvedOptions = resolveOptions(options)
  const h3 = new H3({
    plugins: [proxy(resolvedOptions), serveStatic(resolvedOptions)],
    onRequest(event) {
      const url = getRequestURL(event)
      consola.log(
        colors.bgBlueBright(colors.green(` ${event.method} `)),
        colors.bold(colors.gray(url.toString())),
        '\n'
      )
    },
    onError(error) {
      consola.error(error)
    },
  })
  return serve(h3, resolvedOptions.server)
}
