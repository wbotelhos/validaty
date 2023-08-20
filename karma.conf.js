module.exports = function(config) {
  'use strict';

  config.set({
    browsers: ["Chrome"],
    debug: true,

    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "lib/*.css",
      "lib/*.js",
      "spec/fixtures/*.html",
      "spec/spec_helper.js",
      "spec/javascripts/**/*.js",
    ],

    frameworks: ["jasmine", "fixture"],
    preprocessors: { "**/*.html": ["html2js"] },
    singleRun: true,
  });
};
