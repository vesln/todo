var Todos = require('../lib/todos');
var Todo = require('../lib/todo');

var storage = { read: function() { return []; } };
var pending = { id: 1, status: 'pending', desc: 'desc', };
var completed = { id: 2, status: 'done', desc: 'desc' };
var data = [ pending, completed ];

describe(Todos, function() {
  describe('#list', function() {
    it('lists todo items with given status', function() {
      jack(storage, 'read', function() { return data; });

      var todos = new Todos(storage);
      var items = todos.list('pending');

      items.should.have.lengthOf(1);
      items[0].id.should.eq(pending.id);
    });
  });

  describe('#create', function() {
    it('creates a new todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');

      todos.create('desc');
      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc') ]);
    });
  });

  describe('#check', function() {
    it('completes todo items and persists them', function() {
      var todos = new Todos(storage);

      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });

      todos.check(pending.id);
      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc', 'done') ]);
    });

    it('errors when it cannot find the given todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'read', function() { return [pending]; });

      should.throw(function() {
        todos.check(completed.id);
      });
    });
  });

  describe('#undo', function() {
    it('undoes todo items and persists them', function() {
      var todos = new Todos(storage);

      jack(storage, 'write');
      jack(storage, 'read', function() { return [ completed ]; });

      todos.undo(completed.id);
      storage.write.should.have.been.called.with.args([ new Todo(2, 'desc', 'pending') ]);
    });

    it('errors when it cannot find the given todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'read', function() { return [ completed ]; });

      should.throw(function() {
        todos.undo(pending.id);
      });
    });
  });

  describe('#destroy', function() {
    it('undoes todo items and persists them', function() {
      var todos = new Todos(storage);

      jack(storage, 'write');
      jack(storage, 'read', function() { return [ pending, completed ]; });

      todos.destroy(completed.id);
      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc', 'pending') ]);
    });

    it('errors when it cannot find the given todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'read', function() { return [ completed ]; });

      should.throw(function() {
        todos.destroy(pending.id);
      });
    });
  });

  describe('#clear', function() {
    it('persists a blank todo list', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      todos.clear();
      storage.write.should.have.been.called.with.args([]);
    });
  });
});
