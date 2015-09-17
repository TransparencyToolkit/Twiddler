var _ = require('underscore')
var chalk = require('chalk')
var TextParse = require('text-parse')
var Outputer = require('./outputer')

var Parse = {
  inputs: ['string'],
  convert: [
    { from: 'element', to: 'string' },
    { from: 'multi-line', to: 'string' }
  ],
  methods: {}
}

Parse.Process = function(opts, data, data_type, output) {
  // ...someone write this tool please :)
}

module.exports = Parse
