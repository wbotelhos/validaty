module.exports = function(config) {
  'use strict';

  config.set({
    browsers:   ['Chrome', 'Firefox'],
    debug:      true,
    frameworks: ['jasmine', 'fixture'],
    singleRun:  true,

    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'spec/fixtures/*.html',


      'lib/*.css',
      'lib/*.js',

      'spec/spec_helper.js',

      'spec/javascripts/**/*.js'
    ],

    preprocessors: {
      '**/*.html': ['html2js']
    }
  });
};
