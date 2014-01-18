var join = require('path').join;
var fs = require('fs');
var Storage = require('../lib/storage');
var tmp = join(__dirname, 'tmp', 'db.json');

describe(Storage, function() {
  describe('#read', function() {
    it('reads and parses the database file', function() {
      var data = { foo: 'bar' };
      fs.writeFileSync(tmp, JSON.stringify(data), 'utf8');
      var storage = new Storage(tmp);
      storage.read().should.deep.equal(data);
    });
  });

  describe('#write', function() {
    it('serializes and writes the supplied data into a file', function() {
      var data = { foo: 'bar' };
      var storage = new Storage(tmp);
      storage.write(data);
      JSON.parse(fs.readFileSync(tmp, 'utf8')).should.deep.equal(data);
    });
  });
});
