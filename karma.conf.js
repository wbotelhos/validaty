module.exports = function(config) {
  'use strict';

  config.set({
    browsers: ["Chrome"],
    debug: true,

    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "src/*.css",
      "src/*.js",
      "__tests__/fixtures/*.html",
      "__tests__/spec_helper.js",
      "__tests__/javascripts/**/*.js",
    ],

    frameworks: ["jasmine", "fixture"],
    preprocessors: { "**/*.html": ["html2js"] },
    singleRun: true,
  });
};
