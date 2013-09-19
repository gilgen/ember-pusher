module.exports = function(grunt) {
  grunt.registerMultiTask('browser', "Export the object in <%= cfg.barename %> to the window", function() {
    this.files.forEach(function(f) {
      var output = ["(function(globals) {"];

      output.push.apply(output, f.src.map(grunt.file.read));

      output.push('window.<%= cfg.namespace %> = requireModule("<%= cfg.barename %>");');
      output.push('})(window);');

      grunt.file.write(f.dest, grunt.template.process(output.join("\n")));
    });
  });
}
