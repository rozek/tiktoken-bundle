import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'tiktoken-bundle',
      fileName: 'tiktoken-bundle',
      formats: ['es']
    },
    rollupOptions: {
      // Make sure to bundle all dependencies
      external: [],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // Ensure the bundle works in browsers
    target: 'es2020',
    minify: 'terser'
  },
  resolve: {
    alias: {
      // Resolve the ranks path correctly
      'ranks': path.resolve(__dirname, 'src/ranks'),
    }
  }
})