import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for custom domain, or '/Stuttgart-International/' for GitHub Pages subdomain
  server: {
    port: 3000,
    open: true
  }
})
