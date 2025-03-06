// electron.vite.config.mjs

import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['pg-hstore', 'pg']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['electron', '@db/schema.js']
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('./src/renderer/src'),
        '@main': resolve('./src/main'),
        '@db': resolve('./src/main/db')
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['pg-hstore', 'pg']
      }
    }
  }
})
