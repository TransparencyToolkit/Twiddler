var pkg = require('package')('./')
var path = require('path')
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
Twiddler.Converter  = require('./lib/converter')
Twiddler.Formatter  = require('./lib/formatter')
Twiddler.Processor  = require('./lib/processor')
Twiddler.Outputer   = require('./lib/outputer')


// Load File
if (args.options.input !== undefined) {

  var job_path = path.dirname(args.options.input) + '/'

  // Open Job
  Twiddler.Files.OpenFile(args.options.input)
    .then(function(job) {
      var job = JSON.parse(job)
      job.state = 'opened'

      // Validate Version
      if (pkg.version >= job.version) {

        console.log(chalk.blue('Processing files: ' + job.files.join()))

        // Open File
        Twiddler.Files.OpenFile(job_path + job.files[0])
          .then(function(file_data) {

            console.log(chalk.blue('Opened file: ' + args.options.input))
            console.log('----------------------------------------------------------------')

            // Data Stuff
            var data_output = Twiddler.Outputer[job.output]

            // Process Data
            var data_output = Twiddler.Processor(job, file_data, data_output)

            console.log(data_output)
            console.log('----------------------------------------------------------------')

            // Output Formats
            var output = Twiddler.Outputer.Files(job_path, job, data_output)

            // Debug
            //console.log(output)
            //console.log('-------------------------------------------------------------')


            console.log(chalk.green(output.message))
            console.log(chalk.green('Finished Twiddling all the things'))

        }).catch(function(error) {
          console.log(chalk.red(error))
        })

      }

  }).catch(function(error) {
    console.log(chalk.red(error))
  })

} else {
  console.log(chalk.yellow('Oops, are you sure you specified an --input -i'))
}

module.exports = Twiddler
