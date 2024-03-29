import { build } from 'esbuild'
import { join } from 'path'

export default async function (entryPoints, outdir, options = {}) {
  const buildOptions = {
    entryPoints,
    bundle: true,
    platform: 'node',
    target: 'esnext',
    tsconfig: join(import.meta.dirname, '../tsconfig.json'),
    ...options,
  }

  await Promise.all([
    build({
      ...buildOptions,
      outdir: join(outdir, 'esm'),
      format: 'esm',
    }),
    build({
      ...buildOptions,
      outdir: join(outdir, 'cjs'),
      format: 'cjs',
    }),
  ])
}
