var _ = require('underscore')

var Grow = {}

Grow.do = function(opts, line) {

  if (opts.start !== undefined) {
    line = opts.start + line
  }

  if (opts.end !== undefined) {
    line = line + opts.end
  }

  return line
}

module.exports = Grow
