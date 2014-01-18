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
 * @api public
 */

module.exports = function(argv, todos) {
  var status = 'pending';

  if (~argv.modes.indexOf('done')) status = 'done';
  if (~argv.modes.indexOf('all')) status = 'all';

  var f = filter(argv.commands);

  todos
    .list(status)
    .filter(function(todo) {
      return f(todo.desc);
    })
    .forEach(function(todo) {
      console.log('%d. %s', todo.id, todo.desc);
    });
};
