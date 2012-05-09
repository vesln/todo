/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

var Storage = module.exports = function() {};

Storage.prototype.get = function(type, callback) {
  if (type != 'items') {
    throw 'Invalid type - ' + type + ' (should be items)';
  }

  callback(null, this.items);
};

Storage.prototype.set = function(type, items, callback) {
  if (type != 'items') {
    throw 'Invalid type - ' + type + ' (should be items)';
  }

  this._items = items;

  callback(null);
};

Storage.prototype.save = function(callback) {
  this.items = this._items;
  delete this._items;
  callback(null);
};
