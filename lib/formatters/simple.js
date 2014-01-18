/**
 * External dependencies.
 */

var color = require('eyehurt');

/**
 * Simple formatter.
 *
 * @param {Array} todos
 * @api public
 */

module.exports = function(out, todos) {
  if (!todos.length) return;

  var status = {
    pending: color('✖', 'red'),
    done: color('✓', 'green'),
  };

  console.log('');

  todos.forEach(function(todo) {
    console.log('     '
      +  '#' + todo.id + '  '
      + status[todo.status] + '  '
      + todo.desc
    );
  });

  console.log('');
};
