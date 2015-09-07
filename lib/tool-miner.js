var _ = require('underscore')
var chalk = require('chalk')
var TextMiner = require('text-miner')
var Outputs = require('./outputs')

var Miner = {
  options: {
    'remove-newlines': [
      'Removes newline characters (\n) from all documents',
      true
    ],
    'clean': [
      'Strips extra whitespace from all documents, leaving only at most one whitespace between any two other characters.',
      true,
    ],
    'map': [
      'Applies the function supplied to each doument in the corpus and maps each doc to the result',
      true
    ],
    'remove-punctuation': [
      'Removes interpuncutation characters (! ? . , ; -) from all documents',
      true
    ],
    'remove-newlines': [
      'Removes newline characters (\n) from all documents',
      true
    ],
    'remove-words': [
      'Removes all words in the supplied `words` array from all documents',
      ['STOPWORDS.EN', 'STOPWORDS.DE', 'STOPWORDS.ES', 'STOPWORDS.IT']
    ],
    'remove-digits': [
      'Removes any digits occuring in the texts',
      true
    ],
    'remove-invalid': [
      'Removes all character which are unknown or unrepresentable in Unicode',
      true
    ],
    'stem': [
      'Performs stemming (gerrund removal) of words in a document, supports Lancaster',
      ''
    ],
    'lowercase': [
      'Converts all characters in the documents to lower-case',
      ''
    ],
    'uppercase': [
      'Converts all characters in the documents to upper-case',
      ''
    ],
    'trim': [
      'Strips off whitespace at the beginning and end of each document',
      ''
    ]
  }
}

Miner.Process = function(text_data, opts, output) {

  console.log(chalk.blue('Tool: now running TextMiner'))
  console.log(chalk.yellow('Debug: TextMiner opts: ' + opts.join(', ')))

  var corpus = new TextMiner.Corpus([])

  /************ Add Text ***************/

  corpus.addDocs(text_data)

  if (_.indexOf(opts, 'debug') > -1) {
    console.log(chalk.yellow('Debug: pre processing'))
    console.log('-------------------------------------------------------------')
    corpus.inspect()
  }

  /************ Processing Options **************/

  if (_.indexOf(opts, 'clean') > -1) {
    corpus.clean()
  }

  if (_.indexOf(opts, 'map') > -1) {
    corpus.map()
  }

  if (_.indexOf(opts, 'remove-punctuation') > -1) {
    corpus.removeInterpunctuation()
  }

  if (_.indexOf(opts, 'remove-newlines') > -1) {
    corpus.removeNewlines()
  }

  if (_.indexOf(opts, 'remove-words') > -1) {
    corpus.removeWords(['aloha', 'amigo', 'wat', 'wassup'])
  }

  if (_.indexOf(opts, 'remove-digits') > -1) {
    corpus.removeDigits()
  }

  if (_.indexOf(opts, 'remove-invalid') > -1) {
    corpus.removeInvalidCharacters()
  }

  if (_.indexOf(opts, 'stem') > -1) {
    corpus.stem()
  }

  if (_.indexOf(opts, 'lowercase') > -1) {
    corpus.toLower()
  }

  if (_.indexOf(opts, 'uppercase') > -1) {
    corpus.toUpper()
  }

  if (_.indexOf(opts, 'trim') > -1) {
    corpus.trim()
  }

  if (_.indexOf(opts, 'debug') > -1) {
    console.log(chalk.yellow('Debug: post processing'))
    console.log('-------------------------------------------------------------')
    corpus.inspect()
  }

  /********** Outputing *************  */

  var terms = new TextMiner.Terms(corpus)


  if (output === undefined) {
    var output = Outputs[opts.output]
  }

  output.unsorted = _.union(output.unsorted, terms.vocabulary)

  // ADD: more complex text mining tools to be revisted after structure is ready

  // terms.vocabulary         // an array of all the words occuring
  // terms.dtm                // document term MATRIX
  // terms.nDocs              // number of documents in the term matrix
  // terms.nTerms             // number of terms

  // terms.findFreqTerms(n)   // returns words that occur "n" times
  // terms.removeSparseTerms(5))

  return output
}

module.exports = Miner
