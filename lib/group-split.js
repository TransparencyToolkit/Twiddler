
var _ = require('underscore')
var GroupSplit = {};

GroupSplit.process = function(opts, output, line) {
  var split  = line.split(opts.term)

  if (split.length === 1) {
    //console.log(split.length + ' | ' + opts.depth + ' has ONLY1 part ' + split[0])
    if (_.indexOf(output.unsorted, split[0]) == -1) {
      output.unsorted.push(split[0])
    }
  }
  else if (split.length <= opts.depth) {
    //console.log(split.length + ' | ' + opts.depth + ' has EQUAL part ' + split[0] + ' / ' + split[split.length -1])
    if (output.groups[split[0]]) {
      output.groups[split[0]].push(split[split.length -1])
    } else {
      output.groups[split[0]] = [split[split.length - 1]];
    }
  }

  return output
}

module.exports = GroupSplit
