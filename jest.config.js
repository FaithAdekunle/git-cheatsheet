module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'client/src/app/**/*.{js,jsx}',
    'server/controllers/**/*.{js}',
    'server/models/**/*.{js}',
    'server/routes/**/*.{js}',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jestSetup.js',
};
