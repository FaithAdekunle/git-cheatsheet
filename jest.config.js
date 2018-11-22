module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'server/models/**/*.{js}',
    'server/controllers/**/*.{js}',
    'server/routes/**/*.{js}',
    'client/src/app/**/*.{js|jsx}',
    '!client/src/app/store/index.js',
    '!client/src/app/reducers/index.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jestSetup.js',
};
