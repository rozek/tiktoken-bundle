import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/tiktoken-bundle.ts'),
      name: 'tiktoken-bundle',
      fileName: 'tiktoken-bundle',
      formats: ['es']
    },
    rollupOptions: { // make sure to bundle all dependencies
      external: [],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // ensure the bundle works in browsers
    target: 'es2020',
    minify: 'terser'
  },
  resolve: {
    alias: {
      // resolve the ranks path correctly
      'ranks': path.resolve(__dirname, 'src/ranks'),
    }
  }
})