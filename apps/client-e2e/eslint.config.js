import typescriptEslint from "typescript-eslint";

import baseConfig from "../../eslint.config.js";
import eslintPluginCypress from "eslint-plugin-cypress/flat";

export default typescriptEslint.config(
  ...baseConfig,
  eslintPluginCypress.configs.recommended,
);
