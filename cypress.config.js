const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
    baseUrl: 'https://parabank.parasoft.com', 
  },
  env: {
    allure: true,
    allureResultsPath: 'allure-results'
  },
});

