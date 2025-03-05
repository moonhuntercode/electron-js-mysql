// vitest.config.mjs

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita variables globales como `test` y `expect`
    environment: 'jsdom', // Simula el DOM en las pruebas
    setupFiles: './src/setupTests.js', // Archivo de configuración para las pruebas
    coverage: {
      provider: 'c8', // Usa c8 para generar informes de cobertura
      reporter: ['text', 'html'] // Formatos de los informes de cobertura
    }
  }
})
