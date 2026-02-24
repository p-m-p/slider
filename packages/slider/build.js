import { join } from 'path'
import { buildLib, buildBrowser } from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'box-slider.ts',
  'effects/tile/tile-slider.ts',
  'effects/carousel-slider.ts',
  'effects/cube-slider.ts',
  'effects/fade-slider.ts',
  'plugins/index.ts',
].map((entry) => join(srcDir, entry))

await buildLib(entryPoints, outDir)
await buildBrowser([join(srcDir, 'index.ts')], outDir)
