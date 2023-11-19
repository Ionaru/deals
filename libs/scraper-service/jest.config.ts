export default {
  coverageDirectory: "../../coverage/libs/scraper-service",
  displayName: "scraper-service",
  globals: {},
  moduleFileExtensions: ["ts", "js", "html"],
  preset: "../../jest.preset.cjs",
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
