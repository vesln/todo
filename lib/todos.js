/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Todos constructor.
 *
 * @param {Object} storage
 * @api public
 */
function Todos(storage) {
  this.storage = storage;
};

/**
 * Fetch all items.
 *
 * @params {Function} cb
 * @api public
 */
Todos.prototype.all = function(cb) {
  this.storage.get('items', function(err, items) {
    cb(items || []);
  });
};

Todos.prototype.add = function(text) {
  this.all(function(items) {
    items.push({text: text, done: false});

    this._update(items);
  }.bind(this));
};

Todos.prototype.destroy = function(num) {
  this.all(function(items) {
    items.splice(num, 1);

    this._update(items);
  }.bind(this));
};

Todos.prototype.check = function(num, checked) {
  this.all(function(items) {
    if (!items[num]) {
      throw new Error('There is no todo item with number ' + num + 1);
    }

    items[num].done = checked;

    this._update(items);
  }.bind(this));
};

Todos.prototype.undone = function(callback) {
  this.all(function(items) {
    items = items.filter(function(item) { return !item.done; });
    callback(items);
  });
};

Todos.prototype.clear = function() {
  this._update([]);
};

Todos.prototype._update = function(items) {
  this.storage.set('items', items, function() {
    this.storage.save(function(err) {
      if (err) throw err;
    });
  }.bind(this));
};

module.exports = Todos;
