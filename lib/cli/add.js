/**
 * Create a new todo item.
 *
 * Example:
 *
 *     $ todo add Go to swimming
 *     $ todo add "Write more Java"
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @api public
 */

module.exports = function(argv, todos) {
  todos.create(argv.commands.join(' '));
};
