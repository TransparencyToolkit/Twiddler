var _ = require('underscore')
var chalk = require('chalk')
var TextMiner = require('text-miner')
var Outputer = require('./outputer')

var Miner = {
  inputs: ['array', 'multi-line', 'string'],
  convert: [
    { from: 'element', to: 'string' },
    { from: 'output', to: 'array' }
  ],
  methods: {
    'removeNewlines': [
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
    'removePunctuation': [
      'Removes interpuncutation characters (! ? . , ; -) from all documents',
      true
    ],
    'removeNewlines': [
      'Removes newline characters (\n) from all documents',
      true
    ],
    'removeWords': [
      'Removes all words in the supplied `words` array from all documents',
      ['STOPWORDS.EN', 'STOPWORDS.DE', 'STOPWORDS.ES', 'STOPWORDS.IT']
    ],
    'removeDigits': [
      'Removes any digits occuring in the texts',
      true
    ],
    'removeInvalid': [
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

Miner.Process = function(opts, data, data_type, output) {

  console.log(chalk.blue('Tool: now running TextMiner with type: ' + data_type))
  console.log(chalk.yellow(opts.methods.join(', ')))

  var corpus = new TextMiner.Corpus([])

  /************ Add Text ***************/

  if (data_type == 'array') {
    corpus.addDocs(data)
  }
  else if (_.indexOf(['multi-line', 'string'], data_type) > -1) {
    corpus.addDoc(data)
  }

  //console.log(chalk.yellow('Debug: pre processing'))
  //corpus.inspect()

  /************ Processing Options **************/

  if (_.indexOf(opts.methods, 'clean') > -1) {
    corpus.clean()
  }

  if (_.indexOf(opts.methods, 'map') > -1) {
    corpus.map()
  }

  if (_.indexOf(opts.methods, 'removePunctuation') > -1) {
    corpus.removeInterpunctuation()
  }

  if (_.indexOf(opts.methods, 'removeNewlines') > -1) {
    corpus.removeNewlines()
  }

  if (_.indexOf(opts.methods, 'removeWords') > -1) {
    console.log(chalk.red('RUN removeWords'))
    console.log(chalk.red(opts.removeWords))
    corpus.removeWords(opts.removeWords)
  }

  if (_.indexOf(opts.methods, 'removeDigits') > -1) {
    corpus.removeDigits()
  }

  if (_.indexOf(opts.methods, 'removeInvalid') > -1) {
    corpus.removeInvalidCharacters()
  }

  if (_.indexOf(opts.methods, 'stem') > -1) {
    corpus.stem()
  }

  if (_.indexOf(opts.methods, 'lowercase') > -1) {
    corpus.toLower()
  }

  if (_.indexOf(opts.methods, 'uppercase') > -1) {
    corpus.toUpper()
  }

  if (_.indexOf(opts.methods, 'trim') > -1) {
    corpus.trim()
  }

  //console.log(chalk.yellow('Debug: post processing'))
  //corpus.inspect()

  /********** Outputing *************  */

  var terms = new TextMiner.Terms(corpus)

  // ADD: more complex text mining tools to be revisted after structure is ready

  // terms.vocabulary         // an array of all the words occuring
  // terms.dtm                // document term MATRIX
  // terms.nDocs              // number of documents in the term matrix
  // terms.nTerms             // number of terms

  // terms.findFreqTerms(n)   // returns words that occur "n" times
  // terms.removeSparseTerms(5))

  return { unsorted: terms.vocabulary, groups: {} }
}

module.exports = Miner
