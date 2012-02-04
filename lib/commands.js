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
 * Storage. Just an alias to application config.
 *
 * @type {Object}
 */
var storage = require('./storage');

/**
 * Formatter.
 *
 * @type {Object}
 */
var formatter = require('./formatter');

/**
 * File writing.
 */
var fs = require('fs'),
    path = require('path');

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
  var out = [];
  storage.get('items', function(err, items) {
    items || (items = []);
    for (var i = -1, len = items.length; ++i < len;) {
      if (!app.argv.all && items[i].done) continue;
      out.push(formatter.format(items[i], i + 1));
    }

    out.push('') && out.unshift('');
    out.map(function(line) {
      commands.print(line);
    });
  });
};

/**
 * Marks an item as done.
 *
 * @param {String} Number.
 * @api public
 */
commands.check = function(num) {
  num = +num - 1;
  commands.toggle(num, true);
};

/**
 * Undo a check for item.
 *
 * @param {String} Number.
 * @api public
 */
commands.undo = function(num) {
  num = +num - 1;
  commands.toggle(num, false);
};

/**
 * Toggles an item state.
 *
 * @param {Number} Item index.
 * @param {Boolean} State.
 * @api private
 */
commands.toggle = function(num, state) {
  storage.get('items', function(err, items) {
    items || (items = []);
    if (!items[num]) throw new Error('There is no todo item with number ' + num + 1);
    items[num].done = state;
    storage.set('items', items, function() {
      storage.save(function(err) {
        if (err) throw err;
        commands.export();
      });
    });
  });
};

/**
 * Deletes an item.
 *
 * @param {String} Todo item number.
 * @api public
 */
commands.delete = function(num) {
  num = +num - 1;
  storage.get('items', function(err, items) {
    items || (items = []);
    items.splice(num, 1);
    storage.set('items', items, function() {
      storage.save(function(err) {
        if (err) throw err;
        commands.export();
      });
    });
  });
};

/**
 * Clears the whole todo item.
 *
 * @param {String} Todo item number.
 * @api public
 */
commands.clear = function(num) {
  storage.set('items', [], function(err, items) {
    storage.save(function(err) {
      if (err) throw err;
      commands.export();
    });
  });
};

/**
 * Adds new item to the todo list.
 *
 * @param {String} Item description.
 * @api public
 */
commands.add = function(item) {
  storage.get('items', function(err, items) {
    items || (items = []);
    items.push({ text: item, done: false });
    storage.set('items', items, function(err) {
      storage.save(function(err) {
        if (err) throw err;
        commands.export();
      });
    });
  });
};

/**
 * Prints the todo list to a file.
 *
 * @param {String} File location/name
 * @api public
 */
commands.export = function(filename) {
  var data = '';
  if (!filename) {
    var filename = path.join(__dirname, '..', 'data', 'todo.txt');
  }
  var out = [];
  storage.get('items', function(err, items) {
    items || (items = []);
    for (var i = -1, len = items.length; ++i < len;) {
      if (!app.argv.all && items[i].done) continue;
      out.push(formatter.format(items[i], i + 1));
    }

    out.push('') && out.unshift('');
    out.map(function(line) {
      data += line +"\n";
    });
    fs.writeFile(filename, data, 'utf8', function(err, written) {
      if (err) throw err;
    });
  });
};