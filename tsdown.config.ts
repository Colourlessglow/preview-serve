import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { index: 'src/index.ts', h3: 'src/h3/index.ts' },
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
