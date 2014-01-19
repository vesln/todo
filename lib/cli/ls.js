/**
 * Internal dependencies.
 */

var filter = require('../filter');

/**
 * List all todo items.
 *
 * Example:
 *
 *     $ todo ls
 *     $ todo ls @tag ~other
 *     $ todo ls --all
 *     $ todo ls --done
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @param {Object} options
 * @returns {Array}
 * @api public
 */

module.exports = function(argv, todos, opts) {
  var status = 'pending';

  if (~argv.modes.indexOf('done')) status = 'done';
  if (~argv.modes.indexOf('all')) status = 'all';

  var f = filter(argv.commands);

  return todos.list(status).filter(function(todo) {
    return f(todo.desc);
  });
};
