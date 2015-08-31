var argv = require('argv');

// Args
argv.option({
  name: 'input',
  short: 'i',
  type: 'string',
  description: 'Defines a file to open',
  example: "'index.js --input=value' or 'index.js -i file-to-open.txt"
});

argv.option({
  name: 'format',
  short: 'f',
  type: 'string',
  description: 'Defines output formats (other than files current format)',
  example: "'index.js --format=value' or 'index.js -f md'"
});

argv.option({
  name: 'save',
  short: 's',
  type: 'string',
  description: 'Defines custom name to save output file as',
  example: "'index.js --save=value' or 'index.js -s New File'"
});

module.exports = argv;
