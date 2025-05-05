import angular from "@analogjs/vite-plugin-angular";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { mergeConfig, defineProject, Plugin } from "vitest/config";

import rootConfig from "../../vitest.root.js";

export default mergeConfig(
  rootConfig,
  defineProject({
    plugins: [
      angular({ include: ["src/styles.scss"] }),
      nxViteTsPaths() as Plugin,
      nxCopyAssetsPlugin(["*.md"]) as Plugin,
    ],
    test: {
      setupFiles: "./src/test-setup.ts",
      browser: {
        provider: "playwright",
        enabled: true,
        headless: true,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
);
