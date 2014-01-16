/**
 * Todo collection.
 *
 * @param {Object} database
 * @constructor
 */

function Collection(db) {
  this.db = db;
}

/**
 * Create a new todo item with `desc`.
 *
 * @param {String} todo description
 * @api public
 */

Collection.prototype.create = function(desc) {
  if (!desc) throw new Error('please enter a todo item');
  this.db.write(desc);
};

/**
 * Return all todo items.
 *
 * @returns {String}
 * @api public
 */

Collection.prototype.all = function() {
  return this.db.read();
};

/**
 * Primary export.
 */

module.exports = Collection;
