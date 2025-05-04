// Core ESLint packages
import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import angularEslint from "angular-eslint";

// Plugins
import eslintConfigPrettier from "eslint-config-prettier";
import eslintConfigUnicorn from "eslint-plugin-unicorn";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSonarJS from "eslint-plugin-sonarjs";

export default typescriptEslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
      ...typescriptEslint.configs.recommendedTypeChecked,
      ...typescriptEslint.configs.stylisticTypeChecked,
      ...angularEslint.configs.tsRecommended,
      eslintPluginSonarJS.configs.recommended,
      eslintConfigUnicorn.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: {
          allowDefaultProject: ["vitest.config.ts"],
          defaultProject: "tsconfig.base.json",
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Set the custom processor which will allow us to have our inline Component templates extracted
    // and treated as if they are HTML files (and therefore have the .html config below applied to them)
    processor: angularEslint.processInlineTemplates,

    // Override specific rules for TypeScript files (these will take priority over the extended configs above)
    rules: {
      "unicorn/no-null": "off",
      "import/no-unresolved": "off",
      "unicorn/prefer-top-level-await": "off",
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Page", "Component", "Modal"],
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
            orderImportKind: "asc",
          },
          "newlines-between": "always",
        },
      ],
      "@typescript-eslint/dot-notation": [
        "error",
        {
          allowIndexSignaturePropertyAccess: true,
        },
      ],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "unicorn/consistent-function-scoping": "off",
      "sonarjs/deprecation": "off",
    },
  },
  {
    files: ["**.*.spec.ts", "apps/client-e2e/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
);
