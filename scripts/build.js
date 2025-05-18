import { build } from 'esbuild'
import { join } from 'path'

export async function buildLib(entryPoints, outdir, options = {}) {
  const buildOptions = {
    bundle: true,
    entryPoints,
    packages: 'external',
    platform: 'node',
    target: 'esnext',
    tsconfig: join(import.meta.dirname, '../tsconfig.json'),
    ...options,
  }

  await Promise.all([
    build({
      ...buildOptions,
      format: 'esm',
      outdir: join(outdir, 'esm'),
    }),
    build({
      ...buildOptions,
      format: 'cjs',
      outdir: join(outdir, 'cjs'),
    }),
  ])
}

export async function buildBrowser(entryPoints, outdir, options = {}) {
  await build({
    bundle: true,
    entryPoints,
    format: 'iife',
    minify: true,
    outfile: join(outdir, 'min.js'),
    platform: 'browser',
    target: 'esnext',
    tsconfig: join(import.meta.dirname, '../tsconfig.json'),
    ...options,
  })
}
