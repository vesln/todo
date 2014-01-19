/**
 * Remove a todo item.
 *
 * Example:
 *
 *     $ todo rm 1
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @returns {Todo}
 * @api public
 */

module.exports = function(argv, todos) {
  return todos.destroy(argv.commands[0]);
};
