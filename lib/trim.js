var _ = require('underscore')

var Trim = {}

Trim.do = function(opts, line) {

  // Trim Start
  if (opts.start) {
    line = line.substring(opts.start, line.length)
  }

  // Trim End
  if (opts.end) {
    line = line.substring(0, line.length - opts.end)
  }

  return line
}

module.exports = Trim
