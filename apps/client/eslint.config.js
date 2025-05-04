import typescriptEslint from "typescript-eslint";
import angularEslint from "angular-eslint";

import baseConfig from "../../eslint.config.js";

export default typescriptEslint.config(
  ...baseConfig,
  {
    ignores: ["apps/client/src/app/zeus/*"],
  },
  {
    files: ["**/*.ts"],
    processor: angularEslint.processInlineTemplates,
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "deals",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "deals",
          style: "camelCase",
        },
      ],
    },
  },
  {
    // Everything in this config object targets our HTML files (external templates,
    // and inline templates as long as we have the `processor` set on our TypeScript config above)
    files: ["**/*.html"],
    extends: [...angularEslint.configs.templateRecommended],
    rules: {},
  },
);
