var _ = require('underscore')

var Formatter = {
  types: ['element', 'array', 'object', 'output', 'multi-line', 'string', 'number']
}

Formatter.Determine = function(text_data, tool) {

  // Check Has Data
  if (_.isEmpty(text_data)) {
    if (_.isNaN(text_data)) {
      return 'undefined'
    }
    else if (_.isNumber(text_data)) {
      return 'number'
    } else {
      return 'empty'
    }
  } else {

    // Determine Type
    if (_.isElement(text_data)) {
      return 'element'
    }
    else if (_.isArray(text_data)) {
      return 'array'
    }
    else if (_.isObject(text_data)) {
      if (_.has(text_data, 'unsorted') && _.has(text_data, 'groups')) {
        return 'output'
      } else {
        return 'object'
      }
    }
    else if (_.isString(text_data)) {
      var lines = text_data.split('\n')
      if (lines.length > 1) {
        return 'multi-line'
      } else {
        // FIXME: might want to add awareness of strings with "tabs" or might be OK to punt to individual parser / Tools
        return 'string'
      }
    }
    else {
      return 'undefiened'
    }
  }
}

module.exports = Formatter
