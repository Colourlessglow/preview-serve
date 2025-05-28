import { type App, eventHandler } from 'h3'
import { type ProxyServerOptions, createProxyServer } from 'httpxy'

/**
 * 增加代理配置
 * @param app h3 应用
 * @param name 代理地址
 * @param option 代理配置
 */
const addProxy = (app: App, name: string, option: ProxyServerOptions) => {
  const proxy = createProxyServer(option)
  app.use(
    name,
    eventHandler(async (event) => {
      try {
        await proxy.web(event.node.req, event.node.res)
      } catch (error: any) {
        if (error?.code !== 'ECONNRESET') {
          throw error
        }
      }
    })
  )
}

/**
 * 批量增加代理配置
 * @param app h3 应用
 * @param options 代理配置
 */
export const batchAddProxy = (app: App, options: Record<string, ProxyServerOptions>) => {
  Object.entries(options).forEach(([name, proxy]) => addProxy(app, name, proxy))
}
