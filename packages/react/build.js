import { join } from 'path'
import build from '../../scripts/build.js'

const srcDir = join(import.meta.dirname, 'src')
const outDir = join(import.meta.dirname, 'dist')
const entryPoints = [
  'index.ts',
  'core.ts',
  'Controls.tsx',
  'Carousel.tsx',
  'Cube.tsx',
  'Fade.tsx',
  'Tile.tsx',
].map((entry) => join(srcDir, entry))

await build(entryPoints, outDir, {
  bundle: false,
  packages: 'external',
})
