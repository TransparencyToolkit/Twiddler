var _ = require('underscore')
var TextMiner = require('text-miner')
var TextParse = require('text-parse')
var TextDiff  = require('text-diff')
var TextStats = require('text-stats')

// Load Args
var argv = require('./lib/options')
var args = argv.run()

// App
var Files = require('./lib/files')
var GroupSplit = require('./lib/group-split')
var Formater = require('./lib/formater')

var Twiddler = {}

// Load File
if (args.options.input !== undefined) {
  Files.openFile(args.options.input)
    .then(function(file_data) {
      var lines = file_data.split('\n')

      console.log('Processing on ' + lines.length + ' lines of data ---------------------------')
      var old_stats = TextStats.stats(file_data)
      console.log(old_stats)

      // Output Structure
      var output = {
        unsorted: [],
        groups: {}
      };

      // Tool Arg: find_replace
      var match = ''
      var replace = ''

      // Tool Arg: trim_start
      var trim_start = 0;

      // Tool Arg: trim_end
      var trim_end = 1;

      // Tool Arg: unique
      var unique = [];

      // Tool Arg: group_it
      var group_split = {
        term: '.sbd/',
        depth: 2,
        join: 'ignore',
        unique: true
      }

      // Tool: lines
      _.each(lines, function(line, key) {
        if (line) {

          // Tool: find_replace
          line = line.replace(match, replace);

          // Tool: trim_start(int)
          line = line.substring(trim_start, line.length);

          // Tool: trim_end(int)
          line = line.substring(0, line.length - trim_end);

          // Tool: group_split
          if (group_split) {

            output = GroupSplit.process(group_split, output, line)

          } else {

            // Tool: unique
            if (_.indexOf(unique, line) === -1) {
              unique.push(line)

              // Format: multi_line
              output += line + '\n'
            }
          }
        }
      });

      // Choose format
      if (args.options.format == 'json') {
        var file_output = JSON.stringify(output)
      } else {
        var file_output = Formater.default(args.options.output, output)
      }

      var saveFile = Files.saveFile(args.options.input + '-converted', file_output);
      console.log('Finished -------------------------------------------------------')

  }).catch(function(error) {
    console.log(error);
  });

} else {
  console.log('Oops, are you sure you specified an --input -i');
}

module.exports = Twiddler;
