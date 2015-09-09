var _ = require('underscore')
var htmlToText = require('html-to-text')

var Converter = {
  conversions: [{
    from: 'output',
    to: 'array',
    run: function(data, opts) {
      

    }
  },{
    from: 'element',
    to: 'string',
    run: function(data, opts) {
      var text = htmlToText.fromString(data, opts)
      return text
    }
  },{
    from: 'object',
    to: 'array',
    run: function(data) {
      var pairs = _.pairs(data)
      return _.flatten(pairs)
    }
  },{
      from: 'object',
      to: 'string',
      run: function(data) {
        var pairs = _.pairs(data)
        var flattened = _.flatten(pairs)
        return flattened.join(' ')
      }
  },{
    from: 'multi-line',
    to: 'array',
    run: function(data) {
      var output_array = data.split('\n')
      return output_array
    }
  },{
    from: 'multi-line',
    to: 'string',
    run: function(data) {
      var output_string = data.split('\n')
      return output_string.join(' ')
    }
  }]
}

Converter.Run = function(from, to, data, opts) {
  var converter = _.findWhere(Converter.conversions, {from: from, to: to});
  return converter.run(data, opts)
}

module.exports = Converter
