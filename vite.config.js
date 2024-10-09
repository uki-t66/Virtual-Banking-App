import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Virtual-Banking-App/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})