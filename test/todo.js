var Todo = require('../lib/todo');

describe(Todo, function() {
  it('requires an id', function() {
    should.throw(function() {
      new Todo(null, 'foo');
    });
  });

  it('requires a description', function() {
    should.throw(function() {
      new Todo('id');
    });
  });

  it('has a default pending status', function() {
    var todo = new Todo(1, 'test');
    todo.status.should.eq('pending')
  });

  it('has a default modified date', function() {
    var todo = new Todo(1, 'test');
    todo.modified.should.be.instanceOf(Date);
  });

  describe('#id', function() {
    it('casts the id to number', function() {
      var todo = new Todo('1', 'test');
      todo.id.should.eq(1);
    });

    it('throws an error when id is NaN', function() {
      should.throw(function() {
        new Todo('id', 'desc');
      });
    });
  });

  describe('.create', function() {
    it('returns an array of todo items', function() {
      var attrs = [
        { id: 1, desc: 'Buy beer', status: 'done' },
        { id: 2, desc: 'Feed the pandas', status: 'pending' },
      ];

      var todos = Todo.create(attrs);

      todos[0].id.should.eq(1);
      todos[0].desc.should.eq('Buy beer');
      todos[0].status.should.eq('done');
      todos[1].id.should.eq(2);
      todos[1].desc.should.eq('Feed the pandas');
      todos[1].status.should.eq('pending');
    });
  });

  describe('#complete', function() {
    it('completes the todo item', function() {
      var todo = new Todo(1, 'test');
      todo.complete();
      todo.status.should.eq('done')
    });
  });

  describe('#undo', function() {
    it('undoes the todo', function() {
      var todo = new Todo(1, 'test');
      todo.complete();
      todo.undo();
      todo.status.should.eq('pending')
    });
  });
});
