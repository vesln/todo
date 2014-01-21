/**
 * External dependencies.
 */

var assert = require('assert');

/**
 * Change the ID of given todo item.
 *
 * Example:
 *
 *     $ todo mv 1 2
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @returns {Todo}
 * @api public
 */

module.exports = function(argv, todos) {
  var from = argv.commands[0];
  var to = argv.commands[1];
  assert(from, 'please specify todo id');
  assert(to, 'please specify a new id');
  return todos.mv(from, to);
};
