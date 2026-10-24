import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

const htmlFiles = globSync('*.html', { ignore: ['font-options*.html'] })
const productHtmlFiles = globSync('products/*.html')

const input = {}
for (const file of htmlFiles) {
  const name = file.replace('.html', '')
  input[name] = resolve(__dirname, file)
}
for (const file of productHtmlFiles) {
  const name = file.replace('.html', '').replace('products/', '')
  input[name] = resolve(__dirname, file)
}

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input
    }
  },
  server: {
    open: '/index.html'
  }
})