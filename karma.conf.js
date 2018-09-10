module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular/cli"],
    plugins: [
      require("karma-jasmine"),
      require('karma-sinon'),
      require("karma-chrome-launcher"),
      require("karma-edge-launcher"),
      require("karma-firefox-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular/cli/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: "node_modules/sinon/pkg/sinon.js", instrument: false },
      { pattern: "./src/test.ts", watched: false }
    ],
    preprocessors: {
      "./src/test.ts": ["@angular/cli"]
    },
    mime: {
      "text/x-typescript": ["ts", "tsx"]
    },
    coverageIstanbulReporter: {
      reports: ["html", "lcovonly"],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: "dev"
    },
    reporters:
      config.angularCli && config.angularCli.codeCoverage
        ? ["progress", "coverage-istanbul"]
        : ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      "ChromeHeadless",
      "Chrome",
      "Edge",
      "Firefox",
      "FirefoxHeadless",
      "FirefoxDeveloper",
      "FirefoxAurora",
      "FirefoxNightly"
    ],
    customLaunchers: {
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["-headless"]
      }
    },
    singleRun: true,
    browserDisconnectTolerance: 3, 
    browserDisconnectTimeout : 210000,
    browserNoActivityTimeout : 210000,
    concurrency: Infinity
  });
};
