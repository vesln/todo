var Todo = require('./todo');

function Todos(storage) {
  this.storage = storage;
}

/**
 * Prototype.
 */

Todos.prototype = {

  list: function(status, keywords) {
    keywords = keywords || [];
    var include = [];
    var exclude = [];

    keywords.forEach(function(keyword) {
      if (keyword[0] === '~') {
        exclude.push(keyword.replace(/^~/, ''));
      } else {
        include.push(keyword);
      }
    });

    return this.items.filter(function(todo) {
      var ret = include.length === 0 ? true : false;

      include.forEach(function(keyword) {
        if (~todo.desc.indexOf(keyword)) ret = true;
      });

      return ret;
    }).filter(function(todo) {
      var ret = true;

      exclude.forEach(function(keyword) {
        if (~todo.desc.indexOf(keyword)) ret = false;
      });

      return ret;

    }).filter(function(todo) {
      if (status === 'all') return true;
      return status === todo.status;
    }).map(function(todo) {
      return todo;
    });
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

  /**
   * Lazy load the todo items and return them.
   *
   * @returns {Array}
   * @api private
   */

  get items() {
    if (!this._items) this._items = Todo.create(this.storage.read());
    return this._items;
  },
};

module.exports = Todos;
