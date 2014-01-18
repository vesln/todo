/**
 * External dependencies.
 */

var load = require('refractory')(module, '../formatters', '{{HOME}}/.todo/formatters');

/**
 * Internal dependencies.
 */

var filter = require('../filter');

/**
 * List all todo items.
 *
 * Example:
 *
 *     $ todo ls
 *     $ todo ls @tag ~other
 *     $ todo ls --all
 *     $ todo ls --done
 *
 * @param {Object} argv
 * @param {Todos} todos
 * @param {Object} options
 * @api public
 */

module.exports = function(argv, todos, opts) {
  var status = 'pending';

  if (~argv.modes.indexOf('done')) status = 'done';
  if (~argv.modes.indexOf('all')) status = 'all';

  var format = null;
  var f = filter(argv.commands);
  var items = todos.list(status).filter(function(todo) {
    return f(todo.desc);
  });

  try {
    format = load(opts.format);
  } catch(e) {
    if ('MODULE_NOT_FOUND' !== e.code) throw e;
    throw new Error('Unknown formatter: ' + opts.format);
  }

  format(items)
};
