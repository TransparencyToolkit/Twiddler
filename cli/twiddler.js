#!/usr/bin/env node
'use strict'
var _ = require('underscore')
var pkg = require('package')('./')
var path = require('path')
var chalk = require('chalk')
var program = require('commander')

// Config
var Config = require('../lib/config').Init()

// Cli App
var Cli = {}

Cli.PrintProject = function(project) {
  console.log(chalk.green('--------------------------------------------------------------------------------'))
  console.log(chalk.green('  ' + project.title + ' (' + project.name + ')'))
  console.log(chalk.green('  Description: ' + project.description))
  console.log(chalk.green('  Sources: ' + project.sources.length))
  var source_count = 0
  _.each(project.sources, function(source, count) {
    if (source_count < 5) {
    console.log(chalk.green('    - ' + source.source))
    source_count++
    }
  })
  if (project.sources.length > 5) {
    console.log(chalk.green('    ...' + (project.sources.length - 5) + ' more sources...'))
  }
  console.log(chalk.green('  Tools: ' + _.pluck(project.tools, 'tool').join(', ')))
  console.log(chalk.green('  Output: ' + project.output))
  console.log(chalk.green('  Formats: ' + project.formats.join(', ')))
  console.log(chalk.green('--------------------------------------------------------------------------------'))
  return true
}

program
  .version(pkg.version)
  .command('new <dir>', 'Create a new project file')
  .command('open <project>', 'Open an existing project file')
  .command('source <project>', 'Add source to existing project')
  .command('process <project>', 'Process and output a project file')
  //.command('projects <dir>', 'Show a list of all projects')
  .parse(process.argv)

module.exports = Cli
