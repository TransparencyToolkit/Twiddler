#!/usr/bin/env node

var pkg = require('package')('./')
var path = require('path')
var _ = require('underscore')
var chalk = require('chalk')
var program = require('commander')

//var TextStats = require('text-stats')

// Config
var Config = require('../lib/config').Init()

// Cli App
var Twiddler = {}

program
  .version(pkg.version)
  .command('new <dir>', 'Create a new project file')
  .command('open <dir>', 'Open an existing project file')
  .command('source <dir>', 'Add source to existing project')
  .command('process <dir>', 'Process a project file')
  .parse(process.argv)

module.exports = Twiddler
