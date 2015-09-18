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
  .option('-v, --verbose', 'print out verbose processing details')
  .parse(process.argv)

if (program.args[0] !== undefined) {

  var project = App.Project.Open(program.args[0])

  // Display
  Cli.PrintProject(project)

  var project_options = [
    { action: 'add_file', item: '- add a file' },
    { action: 'add_directory', item: '- add a directory' },
    { action: 'add_text', item: '- add text' },
    { action: 'add_path', item: '- scan a path' },
    { action: 'add_tool', item: '- add a tool' },
    { action: 'run_output', item: '- run an output' },
    { action: 'close', item: '- close project' }
  ]

  var questions = [{
    type: "list",
    name: "project_options",
    message: "Would you like to do now?",
    choices: _.pluck(project_options, 'item')
  }]

  // Run Interactive CLI
  inquirer.prompt(questions, function(answers) {

    var action = _.findWhere(project_options, { item: answers.project_options }).action

    console.log(chalk.yellow('Under Development, will run action: ' + action))

  })

}
