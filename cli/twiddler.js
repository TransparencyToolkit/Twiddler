#!/usr/bin/env node
'use strict'
var pkg = require('package')('./')
var path = require('path')
var program = require('commander')

// Config
var Config = require('../lib/config').Init()

// Cli App
var Twiddler = {}

program
  .version(pkg.version)
  .command('new <dir>', 'Create a new project file')
  .command('open <project>', 'Open an existing project file')
  .command('source <project> [type]', 'Add source to existing project', /^(file|folder|string)$/i, 'file')
  .command('process <project>', 'Process and output a project file')
  .parse(process.argv)

module.exports = Twiddler
