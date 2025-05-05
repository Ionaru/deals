import path from "node:path";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig, Plugin } from "vitest/config";

const projectPath = path.relative(import.meta.dirname, process.cwd());

const reportsDirectory = path.join(
  import.meta.dirname,
  "coverage",
  projectPath,
);

export default defineConfig({
  cacheDir: `${import.meta.dirname}/node_modules/.vitest`,
  plugins: [nxViteTsPaths() as Plugin],
  test: {
    passWithNoTests: true,
    globals: true,
    coverage: {
      enabled: true,
      reportsDirectory,
    },
  },
});
