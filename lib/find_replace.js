var _ = require('underscore')

var FindReplace = function(opts, line) {
  var new_line = line.replace(opts.find, opts.replace);
  return new_line
}

module.exports = FindReplace
