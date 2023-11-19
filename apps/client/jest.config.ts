export default {
  coverageDirectory: "../../coverage/apps/client",
  displayName: "client",
  globals: {},
  preset: "../../jest.preset.cjs",
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        stringifyContentPathRegex: "\\.(html|svg)$",
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
