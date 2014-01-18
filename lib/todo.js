/**
 * Todo item.
 *
 * @param {Number} id
 * @param {String} description
 * @param {String} status (optional)
 * @constructor
 */

function Todo(id, desc, status) {
  if (!desc) throw new Error('please enter a todo item');
  this.id = id;
  this.desc = desc;
  this.status = status || 'pending';
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
    return new Todo(attrs.id, attrs.desc, attrs.status);
  });
};

/**
 * Change the todo status to "pending".
 *
 * @api public
 */

Todo.prototype.undo = function() {
  this.status = 'pending';
};

/**
 * Change the todo status to "done".
 *
 * @api public
 */

Todo.prototype.complete = function() {
  this.status = 'done';
};

/**
 * Primary export.
 */

module.exports = Todo;
