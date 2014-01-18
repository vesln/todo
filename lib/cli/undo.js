/**
 * Undo a completed todo item.
 *
 * Example:
 *
 *     $ todo undo 3
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @api public
 */

module.exports = function(argv, todos) {
  todos.undo(argv.commands[0]);
};
