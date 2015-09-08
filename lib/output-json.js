var _ = require('underscore')
var path = require('path')
var slugs = require('slugs')
var Files = require('./files')

var OutputJSON = function(opts, data) {

  var output = JSON.stringify(data)

  var slug_name = slugs(opts.save)
  var save_path = path.dirname(opts.input) + '/'
  var save_filename = slug_name + '.json'

  // Save JSON
  Files.SaveFile(save_path, save_filename, output, function(saved) {
    console.log('Saved file: ' + saved)
  })
}

module.exports = OutputJSON
