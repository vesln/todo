var fs = require('fs');
var db = '/tmp/todos.txt';

var Todo = require('./todo');

function save(todos) {
  fs.writeFileSync(db, JSON.stringify(todos), 'utf8');
}

function Todos(items) {
  if (!(this instanceof Todos)) return new Todos(items);

  this.items = (items || []).map(function(attrs) {
    return Todo.create(attrs);
  });
}

Todos.prototype = {
  create: function(desc) {
    this.items.push(new Todo(this.nextId(), desc));
    save(this.items);
  },

  nextId: function() {
    var ids = this.items.map(function(todo) {
      return todo.id;
    }).concat(0);

    return Math.max.apply(null, ids) + 1;
  },

  destroy: function(id) {
    var todo = this.find(id);
    this.items.splice(this.items.indexOf(todo), 1);
    save(this.items);
  },

  check: function(id) {
    this.find(id).complete();
    save(this.items);
  },

  clear: function() {
    save([]);
  },

  undo: function(id) {
    this.find(id).undo();
    save(this.items);
  },

  find: function(id) {
    var ret = null;
    this.items.forEach(function(todo) {
      if (todo.id === id) ret = todo;
    });
    if (!ret) throw new Error('Cannot find a todo item with id "' + id + '"');
    return ret;
  },
};

module.exports = Todos;
