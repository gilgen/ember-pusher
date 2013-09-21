// the base for dist files
var baseDistFile = 'dist/ember-pusher-<%= pkg.version %>.';
var s3Uploads = [];
var builds = [
  "", // normal ember-pusher.js
  "amd.",
  "min."
];

builds.forEach(function(build){
  s3Uploads.push({
    src: baseDistFile + build + 'js',
    dest: 'ember-pusher.' + build + 'js'
  });
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
