/**
 * External dependencies.
 */

var stdin = require('stdin');

/**
 * Clear all todo items.
 *
 * Example:
 *
 *     $ todo clear
 *     $ todo clear --force
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @api public
 */

module.exports = function(argv, todos) {
  if (~argv.modes.indexOf('force')) {
    return todos.clear();
  }

  console.log('Are you sure? (y/n)');

  stdin(function(str) {
    if ('y' === str.trim()) return todos.clear();
    console.error('Aborting...');
    process.exit(1);
  });
};
