import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: ['**/dist/**', '**/src/types.ts', '**/src/effects/index.ts'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.join(import.meta.dirname, 'testSetup.ts')],
    projects: ['packages/*'],
  },
})
