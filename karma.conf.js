/* eslint-disable no-process-env */

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var debug = (process.env.NODE_ENV !== 'production');

var KARMA_ENTRY = './karma.entry.js';
var preprocessors = {};
preprocessors[KARMA_ENTRY] = 'webpack';

function makeDefaultConfig() {

  return {
    files: [KARMA_ENTRY],
    singleRun: !debug,
    autoWatch: debug,
    frameworks: ['mocha', 'sinon-chai'],
    preprocessors: preprocessors,
    reporters: ['progress'],
    browsers: ['PhantomJS', 'Chrome'],
    webpack: {
      plugins: webpackConfig.plugins,
      module: {
        loaders: webpackConfig.module.loaders
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher')
    ],
    logLevel: 'DEBUG'
  };
}

module.exports = function (config) {
  config.set(makeDefaultConfig());
  return config;
};
