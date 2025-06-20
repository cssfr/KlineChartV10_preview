import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Changed from 3000 since it was in use
    strictPort: true, // This ensures Vite only uses this exact port
    open: true // Automatically open the browser when starting
  }
}) 