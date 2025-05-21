import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node20',
  dts: true,
  clean: true,
  platform: 'node',
  shims: true,
  publint: true,
  unused: true,
  skipNodeModulesBundle: true,
  exports: true,
  silent: true,
})
