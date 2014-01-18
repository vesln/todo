/**
 * Complete a todo item.
 *
 * Example:
 *
 *     $ todo check 1
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @api public
 */

module.exports = function(argv, todos) {
  todos.check(argv.commands[0]);
};
