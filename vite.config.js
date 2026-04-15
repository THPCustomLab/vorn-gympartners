import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy at https://<user>.github.io/gympartners/  -> base: '/gympartners/'
// If you deploy at https://vorn.global/gympartners/ via CNAME  -> base: '/gympartners/'
// If you deploy at the root of a custom domain (vorn.global)  -> base: '/'
// Override with VITE_BASE env var when building if needed.
const base = process.env.VITE_BASE || '/gympartners/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInlineLimit: 4096
  }
})
