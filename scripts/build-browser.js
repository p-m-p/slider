#!/usr/bin/env node

import { build } from 'esbuild'
import { join } from 'path'

const srcDir = join(process.cwd(), 'src')
const distDir = join(process.cwd(), 'dist')

build({
  bundle: true,
  entryNames: 'boxslider.min',
  entryPoints: [join(srcDir, 'index.ts')],
  globalName: '$bs',
  minify: true,
  outdir: distDir,
  platform: 'browser',
  sourcemap: true,
  target: 'esnext',
  tsconfig: '../../tsconfig.json',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
