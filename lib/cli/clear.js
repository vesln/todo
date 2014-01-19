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
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(str) {
    process.stdin.pause();
    if ('y' === str.trim()) return todos.clear();
    console.error('Aborting...');
    process.exit(1);
  });
};
