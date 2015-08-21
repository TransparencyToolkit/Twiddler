var _ = require('underscore')

var GroupSplit = {};

GroupSplit.process = function(config, output, line) {
  var split  = line.split(config.term)

  if (split.length === 1) {
    //console.log(split.length + ' | ' + config.depth + ' has ONLY1 part ' + split[0])
    if (_.indexOf(output.unsorted, split[0]) == -1) {
      output.unsorted.push(split[0])
    }

  }
  else if (split.length <= config.depth) {
    //console.log(split.length + ' | ' + config.depth + ' has EQUAL part ' + split[0] + ' / ' + split[split.length -1])
    if (output.groups[split[0]]) {
      output.groups[split[0]].push(split[split.length -1])
    } else {
      output.groups[split[0]] = [split[split.length - 1]];
    }
  }

  return output
}

module.exports = GroupSplit
