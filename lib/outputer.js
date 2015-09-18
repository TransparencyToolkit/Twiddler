var _ = require('underscore')
var OutputMD   = require('./output-md')
var OutputJSON = require('./output-json')
var OutputDPKG = require('./output-dpkg')

var Outputer = {
  order: ['unsorted', 'alphabetically', 'reverse'],
  formats: ['md', 'json', 'dpkg'],
  default: {
    unsorted: [], groups: {}
  }
}

Outputer.Files = function(job_path, job, data) {

  var result = { status: 'error', message: 'Oops, something went wrong saving your file' }

  // Has Format
  if (job.formats) {

    // RE-ADD: Sort Order
    if (job.order) {
      data.unsorted.sort()

      _.each(data.groups, function(group_data, group) {
        group_data.sort()
      })
    }

    // Choose Format
    if (_.indexOf(job.formats, 'md') > -1) {
      result.saved = OutputMD(job_path, job, data)
    }

    if (_.indexOf(job.formats, 'json') > -1) {
      result.saved = OutputJSON(job_path, job, data)
    }

    if (_.indexOf(job.formats, 'dpkg') > -1) {
      result.saved = OutputDPKG(job_path, job, data)
    }

    result.message = 'Data exported to formats: ' + job.formats.join(', ')
    return result

  } else {

    result.message = 'You did not specify any formats to export'
    return result

  }
}

module.exports = Outputer
