import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ env }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    ...(process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN
      ? { allowedHosts: ['.' + process.env.BASE44_SANDBOX_HOST_DOMAIN] }
      : {})
  }
}))
