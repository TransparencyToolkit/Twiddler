#!/usr/bin/env node
'use strict'
var _         = require('underscore')
var path      = require('path')
var chalk     = require('chalk')
var inquirer  = require('inquirer')
var program   = require('commander')

var App = require('../app.js')

program
  .option('-t, --type [type]', 'Choose type of source',  /^(file|folder|path|string)$/i, 'folder')
  .parse(process.argv)

if (program.args[0] !== undefined) {

  console.log(chalk.yellow('Open project: ' + program.args[0]))
  console.log(chalk.yellow('Run action: ' + program.type))

}
