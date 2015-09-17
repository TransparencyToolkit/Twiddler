var assert = require("assert")
var cheerio = require('cheerio')
var _ = require('underscore')

var Converter  = require('../lib/converter')
var Files      = require('../lib/files')
var Formatter  = require('../lib/formatter')
var Hasher     = require('../lib/hasher')
var Outputer   = require('../lib/outputer')
var Processor  = require('../lib/processor')
var Project    = require('../lib/project')

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

describe('Twiddler Libraries', function() {

  describe('Converter', function() {
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

  describe('Files ', function() {
    it('should open a file correctly', function() {
      Files.OpenFile('./test/files/simple-file.txt').then(function(test_file) {
        assert('oh hello over there my friend', test_file)
      })
    })
    it('should test saving a file... TO BE DONE', function(done) {
      assert.equal('dog', 'dog')
      done()
    })
  })

  describe('Formatter', function() {
    it('should analyze and determine data style', function(done) {
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

  describe('Hasher', function() {
    it('should get a sha1 hash from a specified file', function() {
      Hasher.GetFromFile('./test/files/paragraph.txt').then(function(file_hash) {
        assert.equal('5de03d86b901d6a29efc48f9f599dafaf388b8d4', file_hash)
      })
    })
    it('should return a sha1 hash from a specified string', function() {
      var string_hash = Hasher.GetFromString('yo dawg, I heard you like boots and cats')
      assert.equal('634b8d151a8673bf051748c5ee506d93967fc128', string_hash)
    })
  })

  describe('Project', function() {
    it('should open a twiddler.json project file', function(done) {
      var project_test = Project.Open('./test/twiddler-test.json')
      assert.equal('twiddler-test-project', project_test.name)
      assert.equal('files/nested-directories.txt', project_test.sources[0].source)
      assert.equal('files/simple-list-whitespace.txt', project_test.sources[2].source)
      done()
    })
    it('should create a new twiddler.json project file in ./test/ directory', function() {
      var project_data = { description: 'used for testing Twiddlers libraries, functions, and calls', state: 'new' }
      Project.New('./test/', 'Twiddler Test Project', project_data).then(function(success) {
        assert.equal('project created', success)
      }, function(error){
        assert.equal('project exists', error)
      })
    })
    it('should add files in ./test/files/ as sources to test', function() {
      var project_data = { description: 'used for testing Twiddlers libraries, functions, and calls', state: 'new' }
      Project.AddSourceFile('./test/', './test/files/nested-directories.txt')
      Project.AddSourceFile('./test/', './test/files/paragraph.txt')
      Project.AddSourceFile('./test/', './test/files/simple-list-whitespace.txt')
    })
    it('should remove a source from project', function() {
      Project.RemoveSource('./test/', './test/files/nested-directories.txt')
      Project.RemoveSource('./test/', './test/files/paragraph.txt')
      Project.RemoveSource('./test/', './test/files/simple-list-whitespace.txt')
    })

  })

});
