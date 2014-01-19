/**
 * Undo a completed todo item.
 *
 * Example:
 *
 *     $ todo undo 3
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @returns {Todo}
 * @api public
 */

module.exports = function(argv, todos) {
  return todos.undo(argv.commands[0]);
};
