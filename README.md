# preview-serve

<!-- automd:badges color="green" license licenseBranch  bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/preview-serve?color=green)](https://npmjs.com/package/preview-serve)
[![npm downloads](https://img.shields.io/npm/dm/preview-serve?color=green)](https://npm.chart.dev/preview-serve)
[![bundle size](https://img.shields.io/bundlephobia/minzip/preview-serve?color=green)](https://bundlephobia.com/package/preview-serve)
[![install size](https://badgen.net/packagephobia/install/preview-serve?color=green)](https://packagephobia.com/result?p=preview-serve)
[![license](https://img.shields.io/github/license/Colourlessglow/preview-serve?color=green)](https://github.com/Colourlessglow/preview-serve/blob/true/LICENSE)

<!-- /automd -->

[![JSR](https://jsr.io/badges/@colourlessglow/preview-serve)](https://jsr.io/@colourlessglow/preview-serve)
[![JSR Score](https://jsr.io/badges/@colourlessglow/preview-serve/score)](https://jsr.io/@colourlessglow/preview-serve)
[![JSR Scope](https://jsr.io/badges/@colourlessglow)](https://jsr.io/@colourlessglow)

web打包目录预览服务

## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install preview-serve

# npm
npm install preview-serve

# yarn
yarn add preview-serve

# pnpm
pnpm install preview-serve

# bun
bun install preview-serve

# deno
deno install preview-serve
```

<!-- /automd -->

## 配置

```ts
import { defineConfig } from 'preview-serve'

export default defineConfig({
  /**
   * 服务监听地址
   */
  hostname: '127.0.0.1',
  /**
   * 服务监听端口
   */
  port: 3000,
  /**
   * web 打包目录
   */
  dist: 'dist',
  proxy: {
    /**
     * 代理配置，详见 [httpxy](https://github.com/unjs/httpxy)
     */
    '/gh': {
      target: ' https://ungh.cc',
      changeOrigin: true,
    }
  }
})
```

## 命令

```sh
preview-serve --dist dist
```


## 贡献者
<!-- automd:contributors author="Colourlessglow" license="MIT" -->

Published under the [MIT](https://github.com/Colourlessglow/preview-serve/blob/main/LICENSE) license.
Made by [@Colourlessglow](https://github.com/Colourlessglow) and [community](https://github.com/Colourlessglow/preview-serve/graphs/contributors) 💛
<br><br>
<a href="https://github.com/Colourlessglow/preview-serve/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Colourlessglow/preview-serve" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
