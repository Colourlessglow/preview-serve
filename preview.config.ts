import { defineConfig } from './src/config'

export default defineConfig({
  dist: 'example',
  proxy: {
    '/gh': {
      target: ' https://ungh.cc',
      changeOrigin: true,
    },
  },
})
