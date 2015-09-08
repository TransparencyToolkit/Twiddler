var assert = require("assert")

var Twiddler = require('../index')


var text_element = {}
var text_determine = { memes: true, doge: ['shibe', 'gordon'], kitteh: ['gulli', 'hoskuldur'], empty_data: {} }
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

describe('Twiddler', function(){

  describe('Twiddler.Files.OpenFile', function() {
    it('should get a txt file', function(done) {
      Twiddler.Files.OpenFile('test/fixtures/nested-directories.txt').then(function(file_data) {
        var lines = file_data.split('\n')
        assert.equal(lines[0], '/home/root/path/thunderbird-profile/ImapMail/account-1.com/INBOX"')
        done()
      })
    })
  });

  describe('Twiddler.Formatter.Determine', function() {
    it('should analyze & determine "empty"', function(done) {
      var text_test = Twiddler.Formatter.Determine(text_determine.empty_data)
      assert.equal('empty', text_test)
      done()
    })
    it('should analyze & determine "object"', function(done) {
      var text_test = Twiddler.Formatter.Determine(text_determine)
      assert.equal('object', text_test)
      done()
    })
    it('should analyze & determine "output"', function(done) {
      var text_test = Twiddler.Formatter.Determine(Twiddler.Outputer.default)
      assert.equal('output', text_test)
      done()
    })
    it('should analyze & determine "array"', function(done) {
      var text_test = Twiddler.Formatter.Determine(['shibe', 'gordon', 'gulli', 'hoskuldur'])
      assert.equal('array', text_test)
      done()
    })
    it('should analyze & determine "multi-line"', function(done) {
      var text_test = Twiddler.Formatter.Determine(text_multi_line)
      assert.equal('multi-line', text_test)
      done()
    })
    it('should analyze & determine "string"', function(done) {
      var text_test = Twiddler.Formatter.Determine('cray cray bee-boppin toonz')
      assert.equal('string', text_test)
      done()
    })
    it('should analyze & determine "number"', function(done) {
      var text_test = Twiddler.Formatter.Determine(12432134123)
      assert.equal('number', text_test)
      done()
    })
    it('should analyze & determine "NaN"', function(done) {
      var text_test = Twiddler.Formatter.Determine(NaN)
      assert.equal('undefined', text_test)
      done()
    })
  })

  describe('Twiddler.Files.SaveFile', function() {
    it('IMPLEMENT should test saving a file...', function(done) {
      assert.equal('dog', 'dog')
      done()
    })
  })

});
