/**
 * Handle ls.
 *
 * @param {Array} todos
 * @api public
 */

exports.ls = function(todos) {
  todos.forEach(function(todo) {
    console.log('%d. %s', todo.id, todo.desc);
  });
};
