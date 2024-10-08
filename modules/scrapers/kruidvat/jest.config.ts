export default {
  coverageDirectory: "../../../coverage/modules/scrapers/kruidvat",
  displayName: "scrapers-kruidvat",
  globals: {},
  moduleFileExtensions: ["ts", "js", "html"],
  preset: "../../../jest.preset.cjs",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
};
