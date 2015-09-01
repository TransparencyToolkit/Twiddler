var _ = require('underscore')
var path = require('path')
var slugs = require('slugs')
var Files = require('./files')

var FormatMD = function(opts, data) {

  var output = '# ' + opts.save + '\n'
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

  var slug_name = slugs(opts.save)
  var save_path = path.dirname(opts.input) + '/'
  var save_filename = slug_name + '.md'

  // Save MD
  Files.SaveFile(save_path, save_filename, output, function(saved) {
    console.log('Saved file: ' + saved)
  })
}

module.exports = FormatMD
