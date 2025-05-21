import type { ListenOptions } from 'listhen'
import { ProxyServerOptions } from 'httpxy'

export interface BaseOptions {
  cwd?: string
  /**
   * 网页包路径
   *
   * > 基于 cwd 配置解析
   */
  dist?: string
  /**
   * 请求代理配置
   */
  proxy?: Record<string, ProxyServerOptions>
}
export interface Options extends Partial<ListenOptions>, BaseOptions {}
export interface ResolveOptions extends Required<BaseOptions> {
  server: Partial<ListenOptions>
}
