#!/usr/bin/env node
'use strict'
var _         = require('underscore')
var chalk     = require('chalk')
var slugs     = require('slugs')
var inquirer  = require('inquirer')
var program   = require('commander')

var App = require('../app.js')

program
  .option('-o, --overwrite', 'overwrite exisitng twiddler.json')
  .option('-s, --scan', 'scans project directory for files and adds sources')
  .parse(process.argv)

var ChooseSources = function(path, type, source) {
  var sources = []
  var new_source = App.Templates.project_source_new
  new_source.source = source
  new_source.type = type
  sources.push(new_source)
  return sources
}

var ChooseTools = function(choices) {
  var tools = []
  _.each(choices, function(tool, index) {
    var this_tool = 'project_tool_' + tool
    tools.push(App.Templates[this_tool])
  })
  return tools
}

var questions = [{
    type: 'input',
    name: 'title',
    message: 'What would you like to call this project?',
    default: App.Templates.project_new.title
  },{
    type: 'input',
    name: 'description',
    message: 'Describe what this project is',
    default: App.Templates.project_new.description,
    validate: function(choice) {
      if (choice && choice != App.Templates.project_new.description) {
        return true
      }
    }
  },{
    type: 'list',
    name: 'license',
    message: 'Specify a license for the outputed data',
    choices: ['PDDL-1.0', 'ODC-1.0', 'ODB-1.0'],
    default: App.Templates.project_new.license
  },{
    type: 'checkbox',
    name: 'tools_picker',
    message: 'Pick tools to use on this data (add more & configure later)',
    choices: App.Tools.available
  },{
    type: "list",
    name: "order",
    message: "Would you like to sort the output?",
    choices: App.Outputer.order,
    default: App.Templates.project_new.order
  },{
    type: 'checkbox',
    name: 'formats',
    message: 'How would you like to export this data?',
    choices: App.Outputer.formats,
    default: App.Templates.project_new.formats,
    validate: function(choice) {
      if (!_.isEmpty(choice)) {
        return true
      }
    }
  }
]

if (program.args[0] !== undefined) {

  // Check Path
  var save_path = App.Utils.AddSlash(program.args[0])
  var check_path = App.Project.Open(save_path)

  if (!_.isObject(check_path) && _.indexOf(['outdated', 'invalid'], check_path) === -1 || program.overwrite) {

    // Suggested Values
    var save_pieces = save_path.split('/')
    questions[0].default = save_pieces[save_pieces.length - 2]

    // Run Interactive CLI
    inquirer.prompt(questions, function(answers) {

      // Process & Remove Answers
      answers['sources'] = App.Templates.project_new.sources
      answers['tools'] = ChooseTools(answers.tools_picker)
      answers = _.omit(answers, 'tools_picker')

      // Save It
      App.Project.New(save_path, answers.title, answers, program.overwrite).then(function(added) {

        var project_name = slugs(answers.title)

        console.log(chalk.green('\nSaved your project: ' + project_name))

        // Scan Files
        if (program.scan) {
          console.log(chalk.green('Scanning files and adding as source\n'))
          App.Files.Walk(save_path, function(file_path) {
            App.Project.AddSourceFile(save_path, file_path)
            console.log(chalk.green(' + added source: ' + file_path))
          })
        }

        console.log(chalk.green('\nOpen & add sources with commands:\n'))
        console.log(chalk.green(' twiddler open ' + project_name))
        console.log(chalk.green(' twiddler open <path>'))
        console.log(chalk.green(' twiddler source ' + project_name + ' <type>\n'))

      }, function(error) {
        console.log(chalk.red(error))
      })
    })
  } else {
    console.log(chalk.yellow('Looks like a project exists there. Try running:\n'))
    console.log(chalk.yellow('    twiddler open ' + save_path + '\n'))
  }
} else {
  console.log(chalk.yellow('Please specify a place to save your project'))
}
