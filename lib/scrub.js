var _ = require('underscore')
var TextScrub = require('text-scrub')

var Scrub = function(text_data) {

  var output = {
    unsorted: [],
    groups: {}
  }

  var scrubber = [
    { tool: 'trim', start: 'add "/home/jack/thunderbird-profiles/8j702x6r.default/ImapMail/', end: 1 },
    { tool: 'swap', regex: 'url', item: 1, replace: '' },
    { tool: 'trim', start: '/' },
    { tool: 'splitter', term: '.sbd/', depth: 2, overage: 'unsorted', output: output },
  ]

  // Text Scrubber
  var lines = text_data.split('\n')

  if (lines.length) {
    _.each(lines, function(line, key) {
      if (line) {
        output = TextScrub.wash(scrubber, line, output)
      }
    })
  } else {
    output = TextScrub.Wash(scrubber, line)
  }

  // Sort Order
  output.unsorted.sort()
  _.each(output.groups, function(data, group) {
    data.sort()
  })

  return output
}

module.exports = Scrub
