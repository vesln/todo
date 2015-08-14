/**
 * Re-numbers.
 *
 * Example:
 *
 *     $ todo renumber
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @returns {Array}
 * @api public
 */

module.exports = function(argv, todos) {
  return todos.renumber();
};
