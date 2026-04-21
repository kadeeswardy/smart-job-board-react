import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  cacheDir: '.vite-native-cache',
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
