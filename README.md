Twiddler
========

This currently is a catch all package that uses other node text manipulation packages as well as my own little experiments.

### Text Miner

Use [text-miner](https://www.npmjs.com/package/text-miner) module to do numerous text mining operations like stripping whitespace, punctuation, new lines, and stop words from a corpus of text.

```
var tm = require('text-miner)
var my_corpus = new tm.Corpus(array_of_strings)

my_corpus.removeNewlines()
```

### Text Parse

Use [text-parse](https://www.npmjs.com/package/text-parse) module to break text down from larger bodies to paragraphs, sentences, words, and characters.

```
var TextParse = require('text-parse')
var parser = TextParse()
console.log(parser.parse("This is some text?"))
```

### Text Stats

Use [text-stats](https://www.npmjs.com/package/text-stats) to get basic stats about a text file

```
var TextStats = require('text-stats')
var text = "this is a text.\nAnd also a test";
var stats = textStats.stats(text);
console.log(stats.words) // 235 words
```

### Text Diff

Use [text-diff](https://www.npmjs.com/package/text-diff) module to compute a diff between two pieces of text.

```
var Diff = require('text-diff')
var diff = new Diff()

var textDiff = diff.main('text1', 'text2')

diff.prettyHtml(textDiff); // produces a formatted HTML string
```


## Emoji Text

Use [emoji-text](https://www.npmjs.com/package/emoji-text) module to convert emoji text to English word representations

```
var emojiText = require("emoji-text");

emojiText.convert("🐱🐶"); // "[cat][dog]"
emojiText.convert("🐔 🌵", {
  delimeter: ':'
}); // ":chicken: :cactus:"
```
