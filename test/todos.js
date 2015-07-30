var Todos = require('../lib/todos');
var Todo = require('../lib/todo');
var time = require('timekeeper');

var storage = { read: function() { return []; } };
var pending = { id: 1, status: 'pending', desc: 'desc', };
var completed = { id: 2, status: 'done', desc: 'desc' };
var data = [ pending, completed ];

describe(Todos, function() {
  describe('#list', function() {
    it('returns todo items with given status', function() {
      jack(storage, 'read', function() { return data; });

      var todos = new Todos(storage);
      var items = todos.list('pending');

      items.should.have.lengthOf(1);
      items[0].id.should.eq(pending.id);
    });

    it('returns all todo items when the status is "all"', function() {
      jack(storage, 'read', function() { return data; });
      var todos = new Todos(storage);
      todos.list('all').should.have.lengthOf(2);
    });

    it('sorts the todo items by id', function() {
      jack(storage, 'read', function() {
        return [ { id: 2, desc: 'desc', }, { id: 1, desc: 'desc' } ];
      });

      var todos = new Todos(storage);
      var items = todos.list('all');

      items[0].id.should.eq(1);
      items[1].id.should.eq(2);
    });
  });

  describe('#create', function() {
    it('creates a new todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');

      time.freeze();
      todos.create('desc');
      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc') ]);
    });

    it('sets the right id', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });

      todos.create('desc');
      storage.write.calls[0].args[0][1].id.should.eq(2);
    });

    it('returns the new todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      todos.create('desc').desc.should.eq('desc');
    });
  });

  describe('#check', function() {
    it('completes todo items and persists them', function() {
      var todos = new Todos(storage);

      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });

      time.freeze();

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

    it('returns the todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });
      todos.check(pending.id).desc.should.eq(pending.desc);
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

    it('returns the todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });
      todos.undo(pending.id).desc.should.eq(pending.desc);
    });
  });

  describe('#destroy', function() {
    it('removes todo items', function() {
      var todos = new Todos(storage);

      jack(storage, 'write');
      jack(storage, 'read', function() { return data; });

      time.freeze();

      todos.destroy(pending.id);
      storage.write.should.have.been.called.with.args([ new Todo(2, 'desc', 'done') ]);
    });

    it('errors when it cannot find the given todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'read', function() { return [ completed ]; });

      should.throw(function() {
        todos.destroy(pending.id);
      });
    });

    it('returns the todo item', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      jack(storage, 'read', function() { return [pending]; });
      todos.destroy(pending.id).desc.should.eq(pending.desc);
    });
  });

  describe('#clear', function() {
    it('clears todos with give status', function() {
      var todos = new Todos(storage);

      time.freeze();

      jack(storage, 'write');
      jack(storage, 'read', function() { return data; });

      todos.clear('done');
      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc', 'pending') ]);
    });

    it('persists a blank todo list', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      todos.clear();
      storage.write.should.have.been.called.with.args([]);
    });
  });

  describe('#mv', function() {
    it('changes the ids of todo items', function() {
      var todos = new Todos(storage);
      jack(storage, 'read', function() { return [ completed ]; });
      jack(storage, 'write');

      todos.mv(completed.id, 42).id.should.eq(42);
    });

    it('persists the todo items', function() {
      var todos = new Todos(storage);
      jack(storage, 'write');
      jack(storage, 'read', function() { return data; });

      todos.mv(pending.id, 42);
      storage.write.should.have.been.invoked();
    });

    it('swaps the ids of todo items', function() {
      var todos = new Todos(storage);
      var actual = null;

      jack(storage, 'write', function(todos) {
        actual = todos.map(function(todo) {
          return todo.id;
        });
      });

      jack(storage, 'read', function() {
        return [ { id: 1, desc: 'desc' }, { id: 2, desc: 'desc' } ];
      });

      todos.mv(1, 2);

      actual.should.eql([2, 1]);
    });
  });

  describe('#renumber', function() {
    it('renumbers the todo items', function() {
      var todos = new Todos(storage);

      time.freeze();
      jack(storage, 'write');
      jack(storage, 'read', function() { return [ completed ]; });

      todos.renumber();

      storage.write.should.have.been.called.with.args([ new Todo(1, 'desc', 'done') ]);
    });
  });
});
