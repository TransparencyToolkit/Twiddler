var assert = require("assert")
var cheerio = require('cheerio')
var _ = require('underscore')

var Files      = require('../lib/files')
var Project    = require('../lib/project')
var Converter  = require('../lib/converter')
var Formatter  = require('../lib/formatter')
var Processor  = require('../lib/processor')
var Outputer   = require('../lib/outputer')

$ = cheerio.load('<div id="test">Yo, howz it going in the <a href="https://doge-haus.de" target="_blank">doge haus</a> my friend?</div>')

var text_determine = { memes: true, doge: ['shibe', 'gordon'], kitteh: ['gulli', 'hoskuldur'], empty_data: {} }
var text_object_simple = { doge: 'Shibe life for eva', kitteh: 'Hoskuldur is a boss' }
var text_multi_line = '/home/root/path/thunderbird-profile/ImapMail/account-5.com/Projects\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-5.com/Ideas\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/East Coast.sbd/Cities.sbd/New York\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/West Coast.sbd/Cities.sbd/Seatle\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Clients.sbd/USA.sbd/Honey Badgers Ltd.\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-6.com/Friends.sbd/USA.sbd/EFF\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Europe.sbd/Courage Foundation\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Wikileaks\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-7.com/Friends.sbd/Transparency Toolkit\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-8.com/Friends\n'
+ '/home/root/path/thunderbird-profile/ImapMail/account-8.com/Cats\n'
var text_multi_line_simple = 'yo dog\nsup cat\nchillin rat'

describe('Libraries Libraries', function() {

  describe('Project.Open', function() {
    it('should get a Twiddler project file', function() {
      Project.Open('./test/twiddler-test-data.json').then(function(project_test) {
        assert.equal('twiddler-test-data', project_test)
        assert.equal('Multi-line Nested Directory Strings', project_test.sources[0].name)
        assert.equal('Paragraphs of Text', project_test.sources[1].name)
        assert.equal('Simple List Bad Whitespace', project_test.sources[2].name)
      })
    })
  })

  describe('Formatter.Determine', function() {
    it('should analyze & determine "empty"', function(done) {
      var text_test = Formatter.Determine(text_determine.empty_data)
      assert.equal('empty', text_test)
      done()
    })
    it('should analyze & determine "element"', function(done) {
      var text_test = Formatter.Determine($('#test')[0])
      assert.equal('element', text_test)
      done()
    })
    it('should analyze & determine "object"', function(done) {
      var text_test = Formatter.Determine(text_determine)
      assert.equal('object', text_test)
      done()
    })
    it('should analyze & determine "output"', function(done) {
      var text_test = Formatter.Determine(Outputer.default)
      assert.equal('output', text_test)
      done()
    })
    it('should analyze & determine "array"', function(done) {
      var text_test = Formatter.Determine(['shibe', 'gordon', 'gulli', 'hoskuldur'])
      assert.equal('array', text_test)
      done()
    })
    it('should analyze & determine "multi-line"', function(done) {
      var text_test = Formatter.Determine(text_multi_line)
      assert.equal('multi-line', text_test)
      done()
    })
    it('should analyze & determine "string"', function(done) {
      var text_test = Formatter.Determine('cray cray bee-boppin toonz')
      assert.equal('string', text_test)
      done()
    })
    it('should analyze & determine "number"', function(done) {
      var text_test = Formatter.Determine(12432134123)
      assert.equal('number', text_test)
      done()
    })
    it('should analyze & determine "NaN"', function(done) {
      var text_test = Formatter.Determine(NaN)
      assert.equal('undefined', text_test)
      done()
    })
  })

  describe('Twildder.Converter', function() {
    it('should convert "element" to "string"', function(done) {
      var text_test = Converter.Run('element', 'string', $('#test').html(), { ignoreHref: true })
      assert.equal('Yo, howz it going in the doge haus my friend?', text_test)
      done()
    })
    it('should convert "object" to "array"', function(done) {
      var text_test = Converter.Run('object', 'array', text_object_simple)
      assert.equal('Shibe life for eva', text_test[1])
      assert.equal('Hoskuldur is a boss', text_test[3])
      done()
    })
    it('should convert "object" to "string"', function(done) {
      var text_test = Converter.Run('object', 'string', text_object_simple)
      assert.equal('doge Shibe life for eva kitteh Hoskuldur is a boss', text_test)
      done()
    })
    it('should convert "multi-line" to "array"', function(done) {
      var text_test = Converter.Run('multi-line', 'array', text_multi_line_simple)
      assert.equal('yo dog', text_test[0])
      assert.equal('chillin rat', text_test[2])
      done()
    })
    it('should convert "multi-line" to "string"', function(done) {
      var text_test = Converter.Run('multi-line', 'string', text_multi_line_simple)
      assert.equal('yo dog sup cat chillin rat', text_test)
      done()
    })
  })

  describe('Files.SaveFile', function() {
    it('IMPLEMENT should test saving a file...', function(done) {
      assert.equal('dog', 'dog')
      done()
    })
  })

});
