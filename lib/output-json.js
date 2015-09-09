var _ = require('underscore')
var path = require('path')
var chalk = require('chalk')
var slugs = require('slugs')
var Files = require('./files')

var OutputJSON = function(job_path, job, data) {

  var output = JSON.stringify(data)

  var slug_name = slugs(job.name)
  var save_filename = slug_name + '.json'

  // Save JSON
  Files.SaveFile(job_path, save_filename, output, function(saved) {
    console.log(chalk.green('Saved file: ' + saved))
  })
}

module.exports = OutputJSON
