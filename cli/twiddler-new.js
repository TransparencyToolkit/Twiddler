#!/usr/bin/env node
'use strict'
var _         = require('underscore')
var chalk     = require('chalk')
var inquirer  = require('inquirer')
var program   = require('commander')

program
  .option('-o, --overwrite', 'overwrite exisitng twiddler.json')
  .option('-f, --files', 'scans input directory for files and adds as sources')
  .parse(process.argv)

var Config      = require('../lib/config')
var Files       = require('../lib/files')
var Formatter   = require('../lib/formatter')
var Hasher      = require('../lib/hasher')
var Outputer    = require('../lib/outputer')
var Processor   = require('../lib/processor')
var Project     = require('../lib/project')
var Templates   = require('../lib/templates')
var Tools       = require('../lib/tools')
var Utils       = require('../lib/utils')


  var ChooseSources = function(path, type, source) {
    var sources = []
    var new_source = Templates.project_source_new
    new_source.source = source
    new_source.type = type
    sources.push(new_source)
    return sources
  }

  var ChooseTools = function(choices) {
    var tools = []
    _.each(choices, function(tool, index) {
      var this_tool = 'project_tool_' + tool
      tools.push(Templates[this_tool])
    })
    return tools
  }

  var questions = [{
      type: 'input',
      name: 'title',
      message: 'What would you like to call this project?',
      default: Templates.project_new.title
    },{
      type: 'input',
      name: 'description',
      message: 'Describe what this project is',
      default: Templates.project_new.description,
      validate: function(choice) {
        if (choice && choice != Templates.project_new.description) {
          return true
        }
      }
    },{
      type: 'list',
      name: 'license',
      message: 'Specify a license for the outputed data',
      choices: ['PDDL-1.0', 'ODC-1.0', 'ODB-1.0'],
      default: Templates.project_new.license
    },{
      type: 'checkbox',
      name: 'tools_picker',
      message: 'Pick tools to use on this data (add more & configure later)',
      choices: Tools.available
    },{
      type: "list",
      name: "order",
      message: "Would you like to sort the output?",
      choices: Outputer.order,
      default: Templates.project_new.order
    },{
      type: 'checkbox',
      name: 'formats',
      message: 'How would you like to export this data?',
      choices: Outputer.formats,
      default: Templates.project_new.formats,
      validate: function(choice) {
        if (!_.isEmpty(choice)) {
          return true
        }
      }
    }
  ]

if (program.args[0] !== undefined) {

  // Check Path
  var save_path = Utils.AddSlash(program.args[0])
  var check_path = Project.Open(save_path)

  if (!_.isObject(check_path) && _.indexOf(['outdated', 'invalid'], check_path) === -1) {

    // Existing
    var projects = Config.Read('projects')

    // Suggested Values
    var save_pieces = save_path.split('/')
    questions[0].default = save_pieces[save_pieces.length - 2]

    // Run Interactive CLI
    inquirer.prompt(questions, function(answers) {

      // Process & Remove Answers
      answers['sources'] = Templates.project_new.sources
      answers['tools'] = ChooseTools(answers.tools_picker)
      answers = _.omit(answers, 'tools_picker')

      // Save It
      Project.New(save_path, answers.title, answers).then(function(added) {

        // Update Config
        projects.push({ name: answers.title, path: save_path })
        Config.Save('projects', projects)

        console.log(chalk.green('Saved your project ' + answers.title))
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
