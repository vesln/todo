/**
 * Complete a todo item.
 *
 * Example:
 *
 *     $ todo check 1
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @returns {Todo}
 * @api public
 */

module.exports = function(argv, todos) {
  return todos.check(argv.commands[0]);
};
