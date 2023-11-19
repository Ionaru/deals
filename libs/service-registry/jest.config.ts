export default {
  coverageDirectory: "../../coverage/libs/service-registry",
  displayName: "service-registry",
  moduleFileExtensions: ["ts", "js", "html"],
  preset: "../../jest.preset.cjs",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
  },
};
