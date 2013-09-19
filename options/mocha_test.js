module.exports = {
  test: {
    src: [
      'test/vendor/js/jquery.js',
      'test/vendor/js/handlebars.js',
      'test/vendor/js/ember.js',
      'test/vendor/js/pusher.js',
      'test/vendor/js/pusher-test-stub.js',
      'test/vendor/js/assert.js',
      // 'tmp/tests.cjs.js'
    ],
    options: {
      reporter: 'spec'
    }
  }
};

