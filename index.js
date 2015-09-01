var _ = require('underscore')
var chalk = require('chalk')
var TextParse = require('text-parse')
var TextDiff  = require('text-diff')
var TextStats = require('text-stats')

// Args
var argv = require('./lib/options')
var args = argv.run()

// App
var Twiddler = {}

Twiddler.Files      = require('./lib/files')

Twiddler.ToolScrub  = require('./lib/tool-scrub')
Twiddler.ToolMiner  = require('./lib/tool-miner')

Twiddler.Formater   = require('./lib/formater')

// Load File
if (args.options.input !== undefined) {

  Twiddler.Files.OpenFile(args.options.input)
    .then(function(file_data) {

      console.log(chalk.green('Opened file: ' + args.options.input))

      // Process With TextMiner
      // var output = Twiddler.ToolMiner('Some super text goes here in this AWESOME Tool!!!!')
      var data_output = Twiddler.ToolScrub(file_data)

      // Choose Output & Format
      if (args.options.save) {
        var output = Twiddler.Formater(args.options, data_output)
      }

      // console.log(chalk.green('Output:'))
      // console.log(output)
      console.log(chalk.green(output.message))
      console.log(chalk.green('Finished Twiddling all the things'))

  }).catch(function(error) {
    console.log(chalk.red(error))
  })

} else {
  console.log(chalk.yellow('Oops, are you sure you specified an --input -i'))
}

module.exports = Twiddler
