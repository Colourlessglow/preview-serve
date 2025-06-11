import type { TLSSocket } from 'node:tls'
import { type H3, HTTPError, definePlugin, fromNodeHandler, withBase } from 'h3'
import { type ProxyServerOptions, createProxyServer } from 'httpxy'
import { join } from 'pathe'
import type { ResolveOptions } from '../types'

/**
 * 增加代理配置
 * @param app h3 应用
 * @param name 代理地址
 * @param option 代理配置
 */
const addProxy = (app: H3, name: string, option: ProxyServerOptions) => {
  const proxy = createProxyServer(option)
  proxy.on('proxyReq', (proxyReq, req) => {
    if (!proxyReq.hasHeader('x-forwarded-for')) {
      const address = req.socket.remoteAddress
      if (address) {
        proxyReq.appendHeader('x-forwarded-for', address)
      }
    }
    if (!proxyReq.hasHeader('x-forwarded-port')) {
      const localPort = req?.socket?.localPort
      if (localPort) {
        proxyReq.setHeader('x-forwarded-port', req.socket.localPort)
      }
    }
    if (!proxyReq.hasHeader('x-forwarded-Proto')) {
      const encrypted = (req?.connection as TLSSocket)?.encrypted
      proxyReq.setHeader('x-forwarded-proto', encrypted ? 'https' : 'http')
    }
  })
  app.use(
    join(name, '**'),
    withBase(name, async (event) => {
      try {
        await fromNodeHandler(proxy.web as any)(event)
      } catch (error: any) {
        event.res.headers.set('refresh', '3')
        throw new HTTPError({
          statusCode: 503,
          message: 'Preview proxy server is unavailable.',
          cause: error,
        })
      }
    })
  )
}

/**
 * 批量增加代理配置
 * @param options 代理配置
 */
export const proxy = definePlugin<Pick<ResolveOptions, 'proxy'>>((h3, options) => {
  Object.entries(options.proxy).forEach(([name, proxy]) => addProxy(h3, name, proxy))
})
