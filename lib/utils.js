var _ = require('underscore')

var Utils = {}

Utils.AddSlash = function(string) {
  var last = string.substr(-1)
  if (last != '/') {
     string = string + '/'
  }
  return string
}

Utils.IsHidden = function(string) {
  if (string.charAt(0) === '.') {
    return true
  }
  return false
}

module.exports = Utils
