import { consola } from 'consola'
import { colors } from 'consola/utils'
import { type App, createApp, getRequestURL, toNodeListener } from 'h3'
import { type Listener, listen } from 'listhen'
import { resolveOptions } from './config'
import { batchAddProxy } from './proxy'
import { addStatic } from './static'
import type { Options, ResolveOptions } from './types'

/**
 * 预览服务
 */
export class PreviewServer {
  /**
   * node web 服务
   */
  #server: Listener | null
  /**
   * h3 web app
   */
  #app: App
  /**
   * 解析后的配置项
   */
  #options: ResolveOptions
  /**
   * 初始化
   * @param options 配置项
   */
  constructor(options?: Options) {
    this.#options = resolveOptions(options)
    this.#app = createApp({
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
    batchAddProxy(this.#app, this.#options.proxy)
    addStatic(this.#app, this.#options)
  }
  /**
   * 初始化
   * @returns
   */
  async mounted(): Promise<this> {
    this.#server = await listen(toNodeListener(this.#app), this.#options.server)
    return this
  }
  /**
   * 失活
   */
  async unmounted(): Promise<void> {
    await this.#server?.close()
    this.#server = null
  }
}

/**
 * 创建预览服务
 * @param options 配置项
 * @returns
 */
export const createPreviewServer = (options?: Options): Promise<PreviewServer> =>
  new PreviewServer(options).mounted()
