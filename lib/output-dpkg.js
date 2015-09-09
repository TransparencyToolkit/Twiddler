var _ = require('underscore')
var path = require('path')
var chalk = require('chalk')
var DPinit = require('datapackage-init')
var slugs = require('slugs')

var Files = require('./files')

var OutputDPKG = function(job_path, job, data) {

  var output = ['term', 'group', 'notes'].join() + '\n'

  // Add Unsorted
  _.each(data.unsorted, function(item, key) {
    output += [item, 'unsorted', ''].join() + '\n'
  })

  // Add Groups
  _.each(data.groups, function(group, name) {
    _.each(group, function(item, key) {
      output += [item, name, ''].join() + '\n'
    })
  })

  var slug_name = slugs(job.name)
  var save_path = job_path + '/' + slug_name + '/'
  var save_filename = slug_name + '.csv'

  // Save CSV
  Files.SaveFile(save_path, save_filename, output, function(saved) {
    console.log(chalk.green('Saved file: ' + saved))

    // Make Data Package
    DPinit.init(save_path,  function(err, complete) {
      if (err) {
        return console.log(err)
      } else {
        console.log(chalk.green('Saved datapackage.json'))
        DPinit.createResourceEntry(save_path + save_filename, function(err, complete) {
          if (err) {
            return console.log(err)
          } else {
            console.log(chalk.green('Added resource file to datapackage'))
          }
        })
      }
    })

  })

}

module.exports = OutputDPKG
