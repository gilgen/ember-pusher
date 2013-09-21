module.exports = function(grunt) {

  // Load grunt-microlib config & tasks
  var emberPusherConfig = require('grunt-microlib').init.bind(this)(grunt);
  grunt.loadNpmTasks('grunt-microlib');
  grunt.loadNpmTasks('grunt-s3');

  // Custom phantomjs test task
  this.registerTask(
    'test:phantom',
    'Runs tests through the command line using PhantomJS',
    ['build', 'tests', 'mocha_phantomjs']
  );

  // Custom Node test task
  this.registerTask('test', ['build', 'tests', 'mocha_phantomjs']);

  // Load up the configuration
  var config = {
    cfg: {
      name: 'ember-pusher.js',
      barename: 'ember-pusher',
      namespace: 'EmberPusher'
    },
    env: process.env,
    pkg: grunt.file.readJSON('package.json'),
    browserify: require('./options/browserify.js'),
    mocha_phantomjs: require('./options/mocha_phantom.js'),
    s3: require('./options/s3'),
  };

  // Merge config into emberPusherConfig, overwriting existing settings
  grunt.initConfig(grunt.util._.merge(emberPusherConfig, config));

  // Load custom tasks from NPM
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

};

