#!/usr/bin/env node

import { build } from 'esbuild'
import { join } from 'path'

const srcDir = join(process.cwd(), 'src')
const distDir = join(process.cwd(), 'dist')

const options = {
  entryPoints: [join(srcDir, 'index.ts')],
  external: ['react', 'react-dom'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  tsconfig: '../../tsconfig.json',
}

build({
  ...options,
  outdir: join(distDir, 'esm'),
  format: 'esm',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})

build({
  ...options,
  outdir: join(distDir, 'cjs'),
  format: 'cjs',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
