module.exports.init = function(grunt) {
  var nameFor = require('./lib/util').nameFor;

  // Build a new version of the library
  this.registerTask('build', "Builds a distributable version of <%= cfg.name %>", ['clean', 'transpile:amd', 'transpile:commonjs', 'concat:amd', 'concat:browser', 'browser:dist', 'jshint', 'uglify:browser']);
  // Build a new version of the library but without naming the files
  // using pkg.version
  this.registerTask('buildNoVersion',
                    "Builds a distributable version of <%= cfg.name %>, without naming the file with a version",
                    ['clean', 'transpile:amd', 'transpile:commonjs', 'concat:amdNoVersion', 'concat:browser', 'browser:distNoVersion', 'uglify:browserNoVersion']);
  this.registerTask('default', ['build']);

  // Build test files
  this.registerTask('tests', "Builds the test package", ['concat:deps', 'browserify:tests', 'transpile:testsAmd', 'transpile:testsCommonjs', 'buildTests:dist']);

  // Run client-side tests on the command line.
  this.registerTask('test', "Runs tests through the command line using PhantomJS", ['build', 'tests', 'connect', 'qunit']);

  // Run a server. This is ideal for running the QUnit tests in the browser.
  this.registerTask('server', ['build', 'tests', 'connect', 'watch:server']);

  // Load tasks from npm
  var cwd = process.cwd();
  grunt.file.setBase(__dirname); // load tasks relative from grunt-microlib

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');

  // Load Ember Dev tasks
  grunt.loadTasks('tasks/');
  grunt.file.setBase(cwd); // load tasks relative from project

  // Return config to be merged into Grunt config
  return {
    connect: {
      server: {},

      options: {
        hostname: '0.0.0.0',
        port: 8000,
        base: '.'
      }
    },

    watch: {
      server: {
        files: ['lib/**', 'vendor/*', 'test/**/*'],
        tasks: ['build', 'tests']
      },
    },

    transpile: {
      amd: {
        moduleName: nameFor,
        type: 'amd',
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['**/*.js'],
          dest: 'tmp/',
          ext: '.amd.js'
        }]
      },

      commonjs: {
        moduleName: nameFor,
        type: 'cjs',
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['<%= cfg.barename %>/*.js'],
          dest: 'dist/commonjs/',
          ext: '.js'
        },
        {
          src: ['lib/<%= cfg.barename %>.js'],
          dest: 'dist/commonjs/main.js'
        }]
      },

      testsAmd: {
        moduleName: nameFor,
        type: 'amd',
        src: ['test/test_helpers.js', 'test/tests.js', 'test/tests/**/*_test.js'],
        dest: 'tmp/tests.amd.js'
      },

      testsCommonjs: {
        moduleName: nameFor,
        type: 'cjs',
        src: ['test/test_helpers.js', 'test/tests.js', 'test/tests/**/*_test.js'],
        dest: 'tmp/tests.cjs.js'
      }
    },

    uglify: {
      browser: {
        options: {
          mangle: true
        },
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
        }
      },
      browserNoVersion: {
        options: {
          mangle: true
        },
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js'],
        }
      }
    },

    jshint: {
      options: {
        'jshintrc': '.jshintrc'
      },
      output: {
        src: ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
      }
    },

    clean: ["tmp", "dist"],

    concat: {
      amd: {
        src: ['tmp/<%= cfg.barename %>/**/*.amd.js', 'tmp/<%= cfg.barename %>.amd.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.amd.js'
      },

      amdNoVersion: {
        src: ['tmp/<%= cfg.barename %>/**/*.amd.js', 'tmp/<%= cfg.barename %>.amd.js'],
        dest: 'dist/<%= pkg.name %>.amd.js'
      },

      deps: {
        src: ['vendor/deps/*.js'],
        dest: 'tmp/deps.amd.js'
      },

      browser: {
        src: ['node_modules/grunt-microlib/assets/loader.js', 'tmp/<%= cfg.barename %>/**/*.amd.js', 'tmp/<%= cfg.barename %>.amd.js'],
        dest: 'tmp/<%= cfg.barename %>.browser1.js'
      },
    },

    browser: {
      dist: {
        src: 'tmp/<%= cfg.barename %>.browser1.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      distNoVersion: {
        src: 'tmp/<%= cfg.barename %>.browser1.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    buildTests: {
      dist: {
        src: ['node_modules/grunt-microlib/assets/loader.js', 'tmp/tests.amd.js', 'tmp/<%= cfg.barename %>/**/*.amd.js', 'tmp/<%= cfg.barename %>.amd.js'],
        dest: 'tmp/tests.js'
      }
    },
  }
};
