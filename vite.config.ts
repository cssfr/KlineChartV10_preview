import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3001, // Changed from 3000 since it was in use
    strictPort: true, // This ensures Vite only uses this exact port
    open: true // Automatically open the browser when starting
  }
}) 