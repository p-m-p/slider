import { join } from 'path'
import build from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'Carousel.ts',
  'Cube.ts',
  'Fade.ts',
  'SliderControls.ts',
  'Tile.ts',
].map((entry) => join(srcDir, entry))

await build(entryPoints, outDir)
