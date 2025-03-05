// electron.vite.config.mjs
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ["pg-hstore", "pg"]
        // Excluye pg-hstore y pg del empaquetado
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ["pg-hstore", "pg"]
        // Excluye pg-hstore y pg del empaquetado
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@main": resolve("src/main")
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ["pg-hstore", "pg"]
        // Excluye pg-hstore y pg del empaquetado
      }
    }
  }
});
export {
  electron_vite_config_default as default
};
