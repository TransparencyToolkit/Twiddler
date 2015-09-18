#!/usr/bin/env node
'use strict'
var _         = require('underscore')
var path      = require('path')
var chalk     = require('chalk')
var inquirer  = require('inquirer')
var program   = require('commander')

var App = require('../app.js')
var Cli = require('./twiddler')

program
  .option('-v, --verbose', 'Print out verbose processing details')
  .parse(process.argv)

if (program.args[0] !== undefined) {

  var project = App.Project.Open(program.args[0])

  // Display
  Cli.PrintProject(project)
  
  var project_path = program.args[0]
  var project_output = App.Outputer[project.output]

  // Add a simple key/val save like Config has
  // Project.Save(state, 'opened')
  console.log(chalk.blue('Processing sources: ' + _.pluck(project.sources, 'source').join(', ')))

  _.each(project.sources, function(source, item) {

    // Process by source.type
    if (source.type === 'file') {

      // Open File
      App.Files.OpenFile(source.source).then(function(file_data) {

        // Process Data
        var project_output = App.Processor(project, file_data, project_output)

        // Output Formats
        var output = App.Outputer.Files(project_path, project, project_output)

        console.log(chalk.green(output.message))
        console.log(chalk.green('Finished Twiddling all the things'))

      }).catch(function(error) {
        console.log(chalk.red(error))
      })
    }
  })
}
