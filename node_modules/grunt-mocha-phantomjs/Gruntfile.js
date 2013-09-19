/*
 * grunt-mocha-phantomjs
 * https://github.com/jdcataldo/grunt-mocha-phantomjs
 *
 * Copyright (c) 2013 Justin Cataldo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    mocha_phantomjs: {
      no_output: {
        options: {
          'reporter': 'dot'
        },
        files: {
          src: ['test/index.html']
        }
      },
      output: {
        options: {
          'reporter': 'dot',
          'output': 'results/result.txt'
        },
        files: {
          src: ['test/index.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'mocha_phantomjs']);

};
