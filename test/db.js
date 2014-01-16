var fs = require('fs');
var join = require('path').join;
var Db = require('../lib/db');
var tmp = join(__dirname, 'tmp', 'todos.json');

describe('db', function() {
  describe('#write', function() {
    it('stores information into a file', function() {
      var db = new Db(tmp);
      db.write('foo');
      fs.readFileSync(tmp, 'utf8').should.eq('foo');
      fs.unlinkSync(tmp);
    });

    it('throws an error when it cannot save the file', function() {
      var db = new Db('/this/is/invalid/path/hopefully.json');

      should.throw(function() {
        db.write('foo');
      });
    });
  });

  describe('#read', function() {
    it('returns the entire database', function() {
      var db = new Db(tmp);
      fs.writeFileSync(tmp, 'todos', 'utf8');
      db.read().should.eq('todos');
    });
  });
});
