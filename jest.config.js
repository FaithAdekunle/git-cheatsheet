module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'server/models/**/*.{js}',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jestSetup.js',
};
