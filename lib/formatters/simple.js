/**
 * External dependencies.
 */

var color = require('eyehurt');

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
    console.log('  ' + ljust(line[0], max) + '  ' + line[1] + '  ' + line[2]);
  });

  console.log('');
};

/**
 * If `width` is greater than the length of `str`, return a new string of length `width`
 * with `str` left justified
 *
 * @param {String} str
 * @param {Number} width
 * @returns {String}
 * @api private
 */

function ljust(str, width) {
  str += '';
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
}
