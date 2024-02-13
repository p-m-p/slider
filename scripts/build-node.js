#!/usr/bin/env node

import { build } from 'esbuild'
import { join } from 'path'

const srcDir = join(process.cwd(), 'src')
const distDir = join(process.cwd(), 'dist')

import(join(process.cwd(), 'manifest.js'))
  .then(({ entries }) => {
    const builds = ['index.ts', ...entries].map((entry) => {
      const options = {
        entryPoints: [join(srcDir, entry)],
        packages: 'external',
        bundle: true,
        platform: 'node',
        target: 'esnext',
        tsconfig: '../../tsconfig.json',
      }

      return Promise.all([
        build({
          ...options,
          outfile: join(distDir, 'esm', entry.replace(/\.tsx?$/, '.js')),
          format: 'esm',
        }),
        build({
          ...options,
          outfile: join(distDir, 'cjs', entry.replace(/\.tsx?$/, '.cjs')),
          format: 'cjs',
        }),
      ])
    })

    return Promise.all(builds)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
