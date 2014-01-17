var fs = require('fs');
var db = '/tmp/todos.txt';

function save(todos) {
  fs.writeFileSync(db, JSON.stringify(todos), 'utf8');
}

function Todos(items) {
  if (!(this instanceof Todos)) return new Todos(items);
  this.items = items;
}

Todos.prototype = {
  create: function(desc) {
    if (!desc) throw new Error('please enter a todo item');

    var ids = this.items.map(function(todo) {
      return todo.id;
    });

    ids.push(0);

    var id = Math.max.apply(null, ids) + 1;
    var todo = { desc: desc, id: id, status: 'pending' };

    this.items.push(todo);
    save(this.items);
  },

  destroy: function(id) {
    var todo = null;

    this.items.forEach(function(t) {
      if (t.id === id) todo = t;
    });

    if (!todo) {
      throw new Error('Cannot find a todo item with id "' + id + '"');
    }

    this.items.splice(this.items.indexOf(todo), 1);
    save(this.items);
  },

  clear: function() {
    save([]);
  },

  check: function(id) {
    var todo = null;

    this.items.forEach(function(t) {
      if (t.id === id) todo = t;
    });

    if (!todo) {
      throw new Error('Cannot find a todo item with id "' + id + '"');
    }

    todo.status = 'done';
    save(this.items);
  }
};

module.exports = Todos;
