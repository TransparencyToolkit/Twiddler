var _ = require('underscore')
var chalk = require('chalk')
var path = require('path')
var slugs = require('slugs')
var Files = require('./files')

var OutputMD = function(job_path, job, data) {

  console.log(chalk.yellow('Debug: inside FormatMD'))

  var output = '# ' + job.name + '\n'
  output += '\n'

  _.each(data.unsorted, function(line, key) {
    output += line + '\n'
  })

  output += '\n'
  output += '---'
  output += '\n'

  _.each(data.groups, function(group, name) {
    output += '\n'
    output += '## ' + name + '\n'
    output += '\n'

    _.each(group, function(item, key) {
      output += item + '\n'
    })
  })

  var slug_name = slugs(job.name)
  var save_filename = slug_name + '.md'

  // Save MD
  Files.SaveFile(job_path, save_filename, output, function(saved) {
    console.log(chalk.green('Saved file: ' + saved))
  })
}

module.exports = OutputMD
