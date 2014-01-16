var Collection = require('../lib/collection');
var db = {};

describe('Collection', function() {
  describe('#create', function() {
    it('creates a new todo item', function() {
      var collection = new Collection(db);
      jack(db, 'write');
      collection.create('todo item');
      db.write.should.have.been.called.with.args('todo item');
    });

    it('throws an error when called with no description', function() {
      var collection = new Collection;

      should.throw(function() {
        collection.create('');
      }, Error, 'please enter a todo item');
    });
  });

  describe('#all', function() {
    it('returns all todo items', function() {
      var collection = new Collection(db);
      jack(db, 'read', function() {
        return 'todos';
      });
      collection.all().should.eq('todos');
    });
  });
});
