var _ = require('underscore')
var TextMiner = require('text-miner')

var Miner = function(text_data) {

  console.log('inside the TextMiner tool')

  var corpus = new TextMiner.Corpus([])

  corpus.addDoc(text_data)

  corpus
      .trim()
      .toLower()
      .inspect();

  return corpus

}

module.exports = Miner
