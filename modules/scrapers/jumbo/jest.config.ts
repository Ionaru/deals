export default {
  coverageDirectory: "../../../coverage/modules/scrapers/jumbo",
  displayName: "scrapers-jumbo",
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
