import type { ListenOptions } from 'listhen'
import { ProxyServerOptions } from 'httpxy'

/**
 * 基础配置项
 */
export interface BaseOptions {
  /**
   * 网页包基础路径
   */
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
/**
 * 配置项
 */
export interface Options extends Partial<ListenOptions>, BaseOptions {}
/**
 * 解析后的配置项
 */
export interface ResolveOptions extends Required<BaseOptions> {
  /**
   * 服务配置
   */
  server: Partial<ListenOptions>
}
