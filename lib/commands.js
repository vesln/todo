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
 * To-Do list name
 * Default to items
 *
 * @type {String}
 */
var list = 'items';

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
  var from = '\n '+list+':';
  console.log(from);
  storage.get(list, function(err, items) {
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
  storage.get(list, function(err, items) {
    items || (items = []);
    if (!items[num]) throw new Error('There is no todo item with number ' + num + 1);
    items[num].done = state;
    storage.set(list, items, function() {
      storage.save(function(err) {
        if (err) throw err;
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
  storage.get(list, function(err, items) {
    items || (items = []);
    items.splice(num, 1);
    storage.set(list, items, function() {
      storage.save(function(err) {
        if (err) throw err;
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
  storage.set(list, [], function(err, items) {
    storage.save(function(err) {
      if (err) throw err;
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
  storage.get(list, function(err, items) {
    items || (items = []);
    items.push({ text: item, done: false });
    storage.set(list, items, function(err) {
      storage.save(function(err) {
        if (err) throw err;
      });
    });
  });
};

/**
 * Initialize data dir.
 *
 * @api public
 */
commands.init = function() {
  var fs = require('fs'),
      path = require('path');
  var _root_ = process.env.HOME,
      dir = path.join(_root_, '.todo');

  (function(dir) {
    var result = false;
    fs.mkdir(dir, 0755, function(err) {
      if (err) {
        console.log('Can not initialize data dir.');
      } else {
        console.log('Data dir ['+dir+'] created.');
      }
    });
  })(dir);
};


/**
 * Commands lookup table
 *
 * @type {Object}
 */
var opt_table = {
  'ls': commands.list,
  'clear': commands.clear,
  'check': commands.check,
  'undo': commands.undo,
  'rm': commands.delete,
};

/**
 * Do operation to specific list.
 * Use lookup table.
 *
 * @param {String} Todo list name.
 * @param {String} Command to execute.
 * @param {String} Command's option/arg.
 * @api public
 */
commands.operate = function (to, cmd, option) {
  list = to;
  if (typeof opt_table[cmd] === 'undefined') {
    commands.add(cmd + option);
  } else {
    opt_table[cmd](option);
  }
}
