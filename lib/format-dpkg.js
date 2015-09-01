var _ = require('underscore')
var path = require('path')
var DPinit = require('datapackage-init')
var slugs = require('slugs')

var Files = require('./files')

var FormatDPKG = function(opts, data) {

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

  var slug_name = slugs(opts.save)
  var save_path = path.dirname(opts.input) + '/' + slug_name + '/'
  var save_filename = slug_name + '.csv'

  // Save CSV
  Files.SaveFile(save_path, save_filename, output, function() {

    console.log('Here be the save_path: ' + save_path)

    // Make Data Package
    DPinit.init(save_path,  function(err, complete) {
      if (err) {
        return console.log(err)
      } else {

        console.log('Created datapackage.json')
        console.log(complete)

        DPinit.createResourceEntry(save_filename, function(err, complete) {
          if (err) {
            return console.log(err)
          } else {
            console.log('Added resource file to datapackage')
            console.log(complete)
          }
        })

      }
    })

  })

}

module.exports = FormatDPKG
