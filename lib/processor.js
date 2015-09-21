var _ = require('underscore')
var chalk = require('chalk')

var Converter = require('./converter')
var Formatter = require('./formatter')
var Tools = require('./tools')

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

				// Run Tool
	      data = Tools[tool.tool].Process(tool.opts, ready_data, convert.to, output)

      } else {

				// Run Tool
	      data = Tools[tool.tool].Process(tool.opts, ready_data, convert.to, output)
      }

    }
  })

  job.state = 'processed'

  return data
}

module.exports = Processor
