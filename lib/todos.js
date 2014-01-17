/**
 * Internal dependencies.
 */

var Todo = require('./todo');

/**
 * Todos collection.
 *
 * @param {Storage} storage
 * @constructor
 */

function Todos(storage) {
  this.storage = storage;
}

/**
 * Prototype.
 */

Todos.prototype = {

  /**
   * Returns all todo items with given `status`.
   *
   * @returns {Array}
   * @api public
   */

  list: function(status) {
    return this.items.filter(function(todo) {
      if (status === 'all') return true;
      return status === todo.status;
    }).map(function(todo) {
      return todo;
    });
  },

  /**
   * Create a todo item with given description.
   *
   * @param {String} desc
   * @api public
   */

  create: function(desc) {
    this.items.push(new Todo(this.nextId(), desc));
    this.save(this.items);
  },

  /**
   * Complete a todo item with `id`.
   *
   * @param {String|Number} id
   * @api public
   */

  check: function(id) {
    this.find(id).complete();
    this.save(this.items);
  },

  /**
   * Undo a todo item with `id`.
   *
   * @param {String|Number} id
   * @api public
   */

  undo: function(id) {
    this.find(id).undo();
    this.save(this.items);
  },

  /**
   * Destroy a todo item with `id`.
   *
   * @param {String|Number} id
   * @api public
   */

  destroy: function(id) {
    var todo = this.find(id);
    this.items.splice(this.items.indexOf(todo), 1);
    this.save(this.items);
  },

  /**
   * Clear all todo items.
   *
   * @api public
   */

  clear: function() {
    this.save([]);
  },

  /**
   * Return the next todo id.
   *
   * @returns {Number}
   * @api private
   */

  nextId: function() {
    var ids = this.items.map(function(todo) {
      return todo.id;
    }).concat(0);

    return Math.max.apply(null, ids) + 1;
  },

  /**
   * Persist the todo items.
   *
   * @param {Array} data to persist (optional)
   * @api private
   */

  save: function(data) {
    this.storage.save(data || this.items);
  },

  /**
   * Find a todo item by `id`.
   *
   * @param {Number|String} id
   * @returns {Todo} todo item
   * @api private
   */

  find: function(id) {
    id = +id;
    var ret = null;

    this.items.forEach(function(todo) {
      if (todo.id === id) ret = todo;
    });

    if (!ret) {
      throw new Error('Cannot find a todo item with id "' + id + '"');
    }

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

/**
 * Primary export.
 */

module.exports = Todos;
