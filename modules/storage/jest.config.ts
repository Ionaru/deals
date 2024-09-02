export default {
  coverageDirectory: "../../coverage/modules/storage",
  displayName: "storage",
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
