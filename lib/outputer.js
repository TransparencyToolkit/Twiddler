var _ = require('underscore')
var OutputMD   = require('./output-md')
var OutputJSON = require('./output-json')
var OutputDPKG = require('./output-dpkg')

var Outputer = {
  default: {
    unsorted: [], groups: {}
  }
}

Outputer.Save = function(job, data) {

  var output = { status: 'error', message: 'Oops, something went wrong saving your file', data: {}, saved: {} }

  // Has Format
  if (job.format) {

    // Choose Format
    if (_.indexOf(job.format, 'md') > -1) {
      output.saved = OutputMD(job, data)
    }

    if (_.indexOf(job.format, 'json') > -1) {
      output.saved = OutputJSON(job, data)
    }

    if (_.indexOf(job.format, 'dpkg') > -1) {
      output.saved = OutputDPKG(job, data)
    }

    output.message = 'Data exported to formats: ' + job.format.join(', ')
    return output

  } else {

    output.message = 'You did not specify any formats to export'
    return output

  }
}

module.exports = Outputer
