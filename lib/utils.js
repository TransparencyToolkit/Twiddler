var _ = require('underscore')

var Utils = {}

Utils.AddSlash = function(string) {
  var last = string.substr(-1)
  if (last != '/') {
     string = string + '/'
  }
  return string
}

module.exports = Utils
