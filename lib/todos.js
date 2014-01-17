var Todo = require('./todo');

function Todos(storage) {
  if (!(this instanceof Todos)) return new Todos(storage);
  this.storage = storage;
}

Todos.prototype = {
  get items() {
    if (!this._items) {
      this._items = this.storage.read().map(function(attrs) {
        return Todo.create(attrs);
      });
    }

    return this._items;
  },

  save: function(data) {
    this.storage.save(data || this.items);
  },

  create: function(desc) {
    this.items.push(new Todo(this.nextId(), desc));
    this.save(this.items);
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
    this.save(this.items);
  },

  check: function(id) {
    this.find(id).complete();
    this.save(this.items);
  },

  clear: function() {
    this.save([]);
  },

  undo: function(id) {
    this.find(id).undo();
    this.save(this.items);
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
