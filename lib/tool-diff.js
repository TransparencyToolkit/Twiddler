var _ = require('underscore')
var chalk = require('chalk')
var TextDiff = require('text-diff')
var Outputer = require('./outputer')

var Diff = {
  inputs: ['string'],
  convert: [
    { from: 'element', to: 'string' },
    { from: 'multi-line', to: 'string' }
  ],
  methods: {}
}

Diff.Process = function(opts, data, data_type, output) {
  // ...someone write this tool please :)
}

module.exports = Diff
