import { join } from 'path'
import { buildLib } from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'Controls.tsx',
  'Carousel.tsx',
  'Cube.tsx',
  'Fade.tsx',
  'Tile.tsx',
].map((entry) => join(srcDir, entry))

await buildLib(entryPoints, outDir)
