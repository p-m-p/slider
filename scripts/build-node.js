#!/usr/bin/env node

import { build } from 'esbuild'
import { join } from 'path'

const srcDir = join(process.cwd(), 'src')
const distDir = join(process.cwd(), 'dist')
const external = process.argv[2] ? process.argv[2].split(',') : []

const options = {
  entryPoints: [join(srcDir, 'index.ts')],
  external,
  bundle: true,
  platform: 'node',
  target: 'esnext',
  tsconfig: '../../tsconfig.json',
}

Promise.all([
  build({
    ...options,
    outdir: join(distDir, 'esm'),
    format: 'esm',
  }),
  build({
    ...options,
    outfile: join(distDir, 'cjs', 'index.cjs'),
    format: 'cjs',
  }),
]).catch((err) => {
  console.error(err)
  process.exit(1)
})
