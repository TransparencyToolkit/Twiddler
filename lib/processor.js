var _ = require('underscore')
var chalk = require('chalk')

var Formatter = require('./formatter')
var Converter = require('./converter')

var Tools = {
  available: ['miner', 'scrub'],
  miner: require('./tool-miner'),
  scrub: require('./tool-scrub')
}

var Processor = function(job, data, output) {

  // Validate & Use Tools
  _.each(job.tools, function(tool, order) {
    if (_.indexOf(Tools.available, tool.tool) > -1) {

      // State & Extras
      var data_type = Formatter.Determine(data)
      job.state = 'started'

      // Data Prepare (check if type is allowed)
      var allowed_types = Tools[tool.tool].inputs

      if (_.indexOf(allowed_types, data_type) === -1) {

        // Get conversion instruction from tool
        var convert = _.findWhere(Tools[tool.tool].convert, { from: data_type })

        console.log(chalk.yellow('Debug: run converter from: ' + data_type + ' to: ' + convert.to))
        var ready_data = Converter.Run(data_type, convert.to, data)
        data_type = convert.to

      } else {
        var ready_data = data
      }

      // Run Tool
      data = Tools[tool.tool].Process(tool.opts, ready_data, data_type, output)

      //console.log(chalk.green(JSON.stringify(data)))

      job.state = 'tool-' + (order + 1) + '-processed'

    }
  })

  job.state = 'processed'

  return data

}

module.exports = Processor
