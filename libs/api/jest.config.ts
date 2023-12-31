export default {
  coverageDirectory: "../../coverage/libs/api",
  displayName: "api",
  globals: {},
  moduleFileExtensions: ["ts", "js", "html"],
  preset: "../../jest.preset.cjs",
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
  },
};
