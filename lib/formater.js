var _ = require('underscore')

var Formater = {}

Formater.default = function(name, data) {

  var output = '# ' + name + '\n'
  output += '\n'

  _.each(data.unsorted, function(line, key) {
    output += line + '\n'
  })

  output += '\n'
  output += '\n'

  _.each(data.groups, function(group, name) {

    output += '## ' + name + '\n'
    output += '\n'

    _.each(group, function(item, key) {

      output += item + '\n'

    })

  })

  return output

}

module.exports = Formater
