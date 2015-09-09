var _ = require('underscore')
var chalk = require('chalk')
var TextScrub = require('text-scrub')
var Outputer = require('./outputer')

var Scrub = {
  inputs: ['output', 'array', 'string'],
  convert: [
    { from: 'multi-line', to: 'array'},
    { from: 'element', to: 'string' }
  ],
  options: {
    input_format: 'lines',
  }
}

Scrub.Process = function(opts, data, data_type, output) {

  console.log(chalk.blue('Tool: now running TextScrub on ' + data_type))
  //console.log(chalk.yellow('Debug: TextScrub opts: ' + JSON.stringify(opts)))
  //console.log(data

  // Check Data Structure
  if (data_type === 'output') {

    _.each(data.unsorted, function(line, key) {
      if (line) {
        var line_output = TextScrub.wash(opts, line, output)
        output.unsorted.push(line_output)
      }
    })

  } else if (data_type === 'array') {

    _.each(data, function(line, key) {
      if (line) {
        var line_output = TextScrub.wash(opts, line, output)
        if (typeof line_output === 'string') {
          output.unsorted.push(line_output)
        } else {
          output = line_output
        }
      }
    })

  } else if (data_type === 'string') {

    var line_output = TextScrub.wash(opts, data, output)
    output.unsorted.push(line_output)

  } else {
    console.log('Oops, TextScrub does not know what type')
  }

  return output
}

module.exports = Scrub
