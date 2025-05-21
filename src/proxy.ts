import { type App, eventHandler } from 'h3'
import { type ProxyServerOptions, createProxyServer } from 'httpxy'

const addProxy = (app: App, name: string, option: ProxyServerOptions) => {
  const proxy = createProxyServer(option)
  app.use(
    name,
    eventHandler(async (event) => {
      try {
        await proxy.web(event.node.req, event.node.res)
      } catch (error) {
        if (error?.code !== 'ECONNRESET') {
          throw error
        }
      }
    })
  )
}

export const batchAddProxy = (app: App, options: Record<string, ProxyServerOptions>) => {
  Object.entries(options).forEach(([name, proxy]) => addProxy(app, name, proxy))
}
