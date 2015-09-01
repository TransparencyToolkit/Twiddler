var _ = require('underscore')
var FormatMD   = require('./format-md')
var FormatJSON = require('./format-json')
var FormatDPKG = require('./format-dpkg')

var Formater = function(opts, data) {

  var output = { status: 'error', message: 'Oops, something went wrong saving your file', data: {} }

  // Has Format
  if (opts.format) {

    // Choose Format
    if (opts.format == 'md') {

      output = FormatMD(opts, data)

    } else if (opts.format == 'json') {

      output = FormatJSON(opts, data)

    } else if (opts.format == 'dpkg') {

      output = FormatDPKG(opts, data)

    } else {
      output.message = 'The format you specified "' + opts.format + '" is not possible'
    }

    return output

  } else {
    output.message = 'You did not specify a format to save your file as'
    return output
  }

}

module.exports = Formater
