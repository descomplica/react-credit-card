var webpackConfig = require('../webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'phantomjs-shim'],

    files: [
      '**/*-spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      '**/*-spec.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim',
      'karma-spec-reporter',
      'karma-webpack'
    ],

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS', 'Chrome']
  })
}
