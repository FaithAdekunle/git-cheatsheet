module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'server/models/**/*.{js}',
    'server/controllers/**/*.{js}',
    'server/routes/**/*.{js}',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jestSetup.js',
};
