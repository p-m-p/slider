import { join } from 'path'
import build from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'box-slider.ts',
  'effects/tile/tile-slider.ts',
  'effects/carousel-slider.ts',
  'effects/cube-slider.ts',
  'effects/fade-slider.ts',
].map((entry) => join(srcDir, entry))

await build(entryPoints, outDir)
