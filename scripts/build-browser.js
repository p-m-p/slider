#!/usr/bin/env node

import { build } from 'esbuild'
import { join } from 'path'

const srcDir = join(process.cwd(), 'src')
const distDir = join(process.cwd(), 'dist')

build({
  bundle: true,
  entryPoints: [
    join(srcDir, 'index.ts'),
    join(srcDir, 'box-slider.ts'),
    join(srcDir, 'effects', 'carousel-slider.ts'),
    join(srcDir, 'effects', 'cube-slider.ts'),
    join(srcDir, 'effects', 'fade-slider.ts'),
    join(srcDir, 'effects', 'tile', 'tile-slider.ts'),
  ],
  globalName: '$bs',
  minify: true,
  outdir: join(distDir, 'browser'),
  platform: 'browser',
  sourcemap: true,
  target: 'esnext',
  tsconfig: '../../tsconfig.json',
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
