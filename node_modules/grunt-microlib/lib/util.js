module.exports.nameFor = function (path) {
  var match;
  if (match = path.match(/^(?:lib|test|test\/tests)\/(.*?)(?:\.js)?$/)) {
    return match[1];
  }
  else {
    return path;
  }
}
