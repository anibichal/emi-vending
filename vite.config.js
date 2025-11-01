import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // 👈 aquí defines el puerto
    host: true,       // opcional: permite acceder desde otras IPs (útil en Raspberry o kioskos)
  },
})
