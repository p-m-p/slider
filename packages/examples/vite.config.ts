import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  return {
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    plugins: [react()],
  }
})
