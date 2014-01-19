/**
 * External dependencies.
 */

var color = require('eyehurt');

/**
 * Internal dependencies.
 */

var _ = require('../util');

/**
 * Status -> symbol hash.
 */

var status = {
  pending: color('✖', 'red'),
  done: color('✓', 'green'),
};

/**
 * Handle ls.
 *
 * @param {Array} todos
 * @api public
 */

exports.ls = function(todos) {
  if (!todos.length) {
    return;
  }

  var out = [];
  var max = 0;

  todos.forEach(function(todo) {
    var num = todo.id + '.';
    out.push([ num , status[todo.status], todo.desc ]);
    max = Math.max(num.length, max);
  });

  console.log('');

  out.forEach(function(line) {
    console.log('     ' + _.ljust(line[0], max) + '  ' + line[1] + '  ' + line[2]);
  });

  console.log('');
};
