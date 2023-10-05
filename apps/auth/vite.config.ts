import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default {
  cacheDir: "../../node_modules/.vite/auth",
  plugins: [nxViteTsPaths()],
  test: {
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.spec.ts"],
  },
};
