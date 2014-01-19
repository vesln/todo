/**
 * External dependencies.
 */

var color = require('eyehurt');
var ms = require('ms');

/**
 * Internal dependencies.
 */

var _ = require('../util');

/**
 * Status -> symbol hash.
 */

var status = {
  pending: '[ ' + color('✖', 'red') + ' ]',
  done: '[ ' + color('✓', 'green') + ' ]',
};

/**
 * $ todo ls
 *
 * @param {Array} todos
 * @api public
 */

exports.ls = function(todos) {
  if (!todos.length) {
    return print('There are no todo items.');
  }

  var out = [];
  var max = 0;
  var lines = [];

  todos.forEach(function(todo) {
    lines.push({
      state: status[todo.status],
      num: todo.id + '.',
      ago: '(' + ms(+(new Date) - +(new Date(todo.modified)), { long: true }) + ' ago)',
      desc: todo.desc
    });
  });

  console.log('');

  _.column(lines).forEach(function(line) {
    console.log('    '
      + '|  '
      + color(line.num, 'yellow') + '  '
      + line.state + '  '
      + color(line.ago, 'gray') + '  '
      + line.desc);
  });

  console.log('');
};

/**
 * $ todo add
 *
 * @param {Object} todo
 * @api public
 */

exports.add = function(todo) {
  print(color('The todo item "' + todo.desc + '" has been added', 'green'));
};

/**
 * $ todo rm
 *
 * @param {Object} todo
 * @api public
 */

exports.rm = function(todo) {
  print(color('The todo item "' + todo.desc + '" has been removed', 'red'));
};

/**
 * $ todo check
 *
 * @param {Object} todo
 * @api public
 */

exports.check = function(todo) {
  print(color('The todo item "' + todo.desc + '" has been completed', 'gray'));
};

/**
 * $ todo undo
 *
 * @param {Object} todo
 * @api public
 */

exports.undo = function(todo) {
  print(color('The todo item "' + todo.desc + '" has been undone', 'yellow'));
};

/**
 * Print.
 *
 * @api private
 */

function print() {
  var args = [].slice.apply(arguments);
  args.unshift(color('  todo:', 'blue'));
  console.log('');
  console.log.apply(null, args);
  console.log('');
}
