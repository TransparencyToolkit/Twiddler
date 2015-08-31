Tools in Twiddler
=================

This is a raw list of the tools (node modules) packaged inside of Twiddler. Please refer to each individual package for more thorough documentation for development.

### Text Scrub

Use [text-scrub](https://www.npmjs.com/package/text-scrub) performs numerous "chained" operations (first trim from start, then find & replace, then RegEx) on a line of text and outputs strings or structured objects of recursively processed data

```
var TextScrub = require('text-scrub')
var new_text = TextScrub.wash([
  { tool: 'trim', start: '[doge@fort]$ ' },
  { tool: 'swap', find: 'path/thunderbird-profile/ImapMail/account-6.com/', replace: 'messages/' }
], old_text)
```

### Text Miner

Use [text-miner](https://www.npmjs.com/package/text-miner) to perform many natural language processing and simple cleaning jobs on corpus' of text

```
var TextMiner = require('text-miner');
var my_corpus = new tm.Corpus(['Some super text goes here in this AWESOME Tool!!!!']);
my_corpus
    .trim()
    .toLower()
    .inspect();
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
