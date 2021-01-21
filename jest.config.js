/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

// eslint-disable-next-line no-undef
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverageFrom: ["./src/**/*"],
  coverageDirectory: "tests/coverage",
  coverageProvider: "babel",
  coverageReporters: ["json", "text"],

  testEnvironment: "node"
};
