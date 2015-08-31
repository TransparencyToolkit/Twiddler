var assert = require("assert")

var Twiddler = require('../index')

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

  describe('Twiddler.Files.SaveFile', function() {
    it('should...', function(done) {

    })
  })

});
