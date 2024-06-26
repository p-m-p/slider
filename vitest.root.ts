import { join } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: [join(import.meta.dirname, 'testSetup.ts')],
  },
})
