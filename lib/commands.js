/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Commands namespace.
 *
 * @type {Object}
 */
var commands = module.exports;

commands.storage = require('./storage');
commands.todos   = require('./todos').init(commands.storage);

/**
 * Print alias.
 *
 * @api private
 */
commands.print = console.log;

/**
 * The application.
 *
 * @type {Object}
 */
var app = require('./app');

/**
 * Formatter.
 *
 * @type {Object}
 */
var format = require('./formatter').format;

/**
 * File writing.
 */
var fs = require('fs');

/**
 * Prints current version.
 *
 * @api public
 */
commands.version = function() {
  commands.print(require('../package.json').version);
};

/**
 * Lists todo items.
 *
 * @api public
 */
commands.list = function() {
  this.todos[app.argv.all ? 'all' : 'undone'](function(items) {
    commands.print('');
    items.map(format).map(commands.print);
    commands.print('');
  });
};

/**
 * Marks an item as done.
 *
 * @param {String} Number.
 * @api public
 */
commands.check = function(num) {
  this.todos.check(+num - 1, true);
};

/**
 * Undo a check for item.
 *
 * @param {String} Number.
 * @api public
 */
commands.undo = function(num) {
  this.todos.check(+num - 1, false);
};

/**
 * Deletes an item.
 *
 * @param {String} Todo item number.
 * @api public
 */
commands.destroy = function(num) {
  this.todos.destroy(+num - 1);
};

/**
 * Clears the whole todo item.
 *
 * @param {String} Todo item number.
 * @api public
 */
commands.clear = function(num) {
  this.todos.clear();
};

/**
 * Adds new item to the todo list.
 *
 * @param {String} Item description.
 * @api public
 */
commands.add = function(item) {
  this.todos.add(item);
};

/**
 * Prints the todo list to a file.
 *
 * @param {String} File location/name
 * @api public
 */
commands.write = function(filename) {
  var data = '';
  if (!filename) {
    var filename = "~/todo.txt";
  }
  var out = [];
  commands.storage.get('items', function(err, items) {
    items || (items = []);
    for (var i = -1, len = items.length; ++i < len;) {
      if (!app.argv.all && items[i].done) continue;
      out.push(format(items[i], i));
    }

    out.push('') && out.unshift('');
    out.map(function(line) {
      console.log(line);
      data += line +"\n";
    });
    fs.writeFile(filename, data, 'utf8', function(err, written) {
      if (err) return console.log(err);

    });
  });
};