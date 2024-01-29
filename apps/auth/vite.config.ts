import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/auth",
  plugins: [nxViteTsPaths()],
  test: {
    cache: {
      dir: "../../node_modules/.vitest",
    },
    coverage: {
      enabled: true,
      reportsDirectory: "../../coverage/apps/auth",
    },
    include: ["src/**/*.spec.ts"],
    reporters: ["default"],
  },
});
