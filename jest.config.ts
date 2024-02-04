// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("merge");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsPreset = require("ts-jest/jest-preset");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudscapePreset = require("@cloudscape-design/jest-preset");
module.exports = merge.recursive(tsPreset, cloudscapePreset, {
  // preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageReporters: ["lcov", "text", "html"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  //   // process `*.tsx` files with `ts-jest`
  // },
  // rootDir: 'src',
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "\\.(css)$": "identity-obj-proxy",
    "^@app/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"], // this is the KEY
  // note it should be in the top level of the exported object.
});

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     // process `*.tsx` files with `ts-jest`
//   },
//   rootDir: 'src',
//   moduleNameMapper: {
//     "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
//     "\\.(css)$": "identity-obj-proxy",
//     '^@app/(.*)$': '<rootDir>/$1',
//   },
// };
