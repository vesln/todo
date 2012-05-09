/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Application.
 *
 * @type {Object}
 */
var app = module.exports = require('./app');

/**
 * Storage.
 *
 * @type {Object}
 */
var storage = require('./storage');

/**
 * Todos.
 *
 * @type {Function}
 */
var Todos = require('./todos'); // TODO: wtf?

/**
 * Commands.
 *
 * @type {Object}
 */
var commands = require('./commands')

commands.init(new Todos(storage));

// TODO: more docs

/**
 * Version.
 */
app.cmd(/version/, commands.version);

/**
 * List todos.
 */
app.cmd(/ls/, commands.list);

/**
 * Clear a todo item.
 */
app.cmd(/clear/, commands.clear);

/**
 * Mark todo item as finished.
 */
app.cmd(/check (.+)/, commands.check);

/**
 * Undo a todo item.
 */
app.cmd(/undo (.+)/, commands.undo);

/**
 * Destroy a todo item.
 */
app.cmd(/rm (.+)/, commands.destroy);

/**
 * Export a todo list. Is this needed?
 *
 * TODO: Fix me.
 */
app.cmd(/write (.+)/, commands.write);

/**
 * Create a new todo item.
 */
app.cmd(/(.+)/, commands.add);
