import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@boxslider/react']
  },
  build: {
    commonjsOptions: {
      include: [/@boxslider\/react/, /node_modules/]
    }
  }
})
