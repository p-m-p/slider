import { join } from 'path'
import { buildLib, buildBrowser } from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'Carousel.ts',
  'Cube.ts',
  'Fade.ts',
  'SliderControls/index.ts',
  'Tile.ts',
].map((entry) => join(srcDir, entry))

await buildLib(entryPoints, outDir)
await buildBrowser([join(srcDir, 'index.ts')], outDir)
