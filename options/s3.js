// the base for dist files
var baseDistFile = 'dist/ember-pusher-<%= pkg.version %>.';
var builds = ['amd.', ''/* normal ember-pusher.js */ ];
var s3Uploads = [];
builds.forEach(function(build){
  var srcFile = baseDistFile + build + 'js';
  s3Uploads.push({ src: srcFile, dest: 'ember-pusher-<%= env.TRAVIS_COMMIT %>.' + build + 'js' });
  s3Uploads.push({ src: srcFile, dest: 'ember-pusher-latest.' + build + 'js' });
});

module.exports = {
  options: {
    bucket: 'ember-pusher-builds',
    access: 'public-read'
  },
  dev: {
    upload: s3Uploads
  }
};
