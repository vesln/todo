/**
 * Remove a todo item.
 *
 * Example:
 *
 *     $ todo rm 1
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @api public
 */

module.exports = function(argv, todos) {
  todos.destroy(argv.commands[0]);
};
