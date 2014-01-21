/**
 * External dependencies.
 */

var assert = require('assert');

/**
 * Todo item.
 *
 * @param {Number} id
 * @param {String} description
 * @param {String} status (optional)
 * @param {String} modified (optional)
 * @constructor
 */

function Todo(id, desc, status, modified) {
  assert(id, 'please enter an id');
  assert(desc, 'please enter a todo item');

  this.id = +id;
  this.desc = desc;
  this.status = status || 'pending';
  this.modified = modified || new Date;
}

/**
 * Iterate over `arr` and construct a todo item
 * for each element in it.
 *
 * @param {Array}
 * @returns {Array}
 * @api public
 */

Todo.create = function(arr) {
  return arr.map(function(attrs) {
    return new Todo(attrs.id, attrs.desc, attrs.status, attrs.modified);
  });
};

/**
 * Prototype.
 */

Todo.prototype = {

  /**
   * ID getter.
   *
   * @returns {Number}
   */

  get id() {
    return this._id;
  },

  /**
   * ID setter.
   *
   * @param {Number} id
   * @api public
   */

  set id(id) {
    this._id = +id;
    assert(!Number.isNaN(this._id), 'ID must be a number');
  },

  /**
   * Change the todo status to "pending".
   *
   * @api public
   */

  undo: function() {
    this.status = 'pending';
  },

  /**
   * Change the todo status to "done".
   *
   * @api public
   */

  complete: function() {
    this.status = 'done';
  },

  /**
   * toJSON.
   *
   * @returns {Object}
   * @api public
   */

  toJSON: function() {
    return {
      id: this.id,
      desc: this.desc,
      status: this.status,
      modified: this.modified,
    };
  },
};

/**
 * Primary export.
 */

module.exports = Todo;
