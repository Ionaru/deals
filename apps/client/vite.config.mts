/// <reference types="vitest" />

import angular from "@analogjs/vite-plugin-angular";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [angular(), nxViteTsPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["**/*.spec.ts"],
    reporters: ["default"],
    server: {
      deps: {
        inline: [/fesm2022/]
      }
    }
  },
  define: {
    "import.meta.vitest": mode !== "production",
  },
}));
