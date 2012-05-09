/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Commands.
 *
 * @type {Object}
 */
var commands = module.exports;

/**
 * Print alias.
 *
 * @api private
 */
commands.print = function(value) {
  console.log(value);
};

/**
 * Format items for print.
 *
 * @api private
 */
commands.format = function(items) {
  return "\n" + items.map(format).join("\n") + "\n";
};

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
 * Initialize the commands by given todos.
 *
 * @TODO: Fix me
 * @api public
 */
commands.init = function(todos) {
  commands.todos = todos;
  return commands;
}

/**
 * Print current version.
 *
 * @api public
 */
commands.version = function() {
  commands.print(require('../package.json').version);
};

/**
 * List todo items.
 *
 * @api public
 */
commands.list = function() {
  commands.todos[app.argv.all ? 'all' : 'undone'](function(items) {
    commands.print(commands.format(items));
  });
};

/**
 * Mark an item as done.
 *
 * @param {String} Number.
 * @api public
 */
commands.check = function(num) {
  commands.todos.check(+num - 1, true);
};

/**
 * Undo a check for item.
 *
 * @param {String} Number.
 * @api public
 */
commands.undo = function(num) {
  commands.todos.check(+num - 1, false);
};

/**
 * Delete an item.
 *
 * @param {String} Todo item number.
 * @api public
 */
commands.destroy = function(num) {
  commands.todos.destroy(+num - 1);
};

/**
 * Clear the whole todo list.
 *
 * @api public
 */
commands.clear = function() {
  commands.todos.clear();
};

/**
 * Adds new item to the todo list.
 *
 * @param {String} Item description.
 * @api public
 */
commands.add = function(item) {
  commands.todos.add(item);
};

/**
 * Prints the todo list to a file.
 *
 * @param {String} File location/name
 * @api public
 * @TODO: Fix me. I am not working.
 */
commands.write = function(filename) {
  filename || (filename = "~/todo.txt");

  commands.todos[app.argv.all ? 'all' : 'undone'](function(items) {
    var data = commands.format(items);

    commands.print(data);

    fs.writeFile(filename, data, 'utf8', function(err, written) {
      if (err) return commands.print(err);
    });
  });
};
