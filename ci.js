#!/usr/bin/env node
import module from 'node:module'

try {
  module.enableCompileCache?.()
} catch {
  /* empty */
}

const { ci } = await import('./dist/index.js')
ci()
