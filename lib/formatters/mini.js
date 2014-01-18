/**
 * Mini formatter.
 *
 * @param {Array} todos
 * @api public
 */

module.exports = function(todos) {
  todos.forEach(function(todo) {
    console.log('%d. %s', todo.id, todo.desc);
  });
};
