/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * The application object.
 *
 * @type {Object}
 */
var app = module.exports = require('./app');

/**
 * Commands.
 *
 * @type {Object}
 */
var commands = require('./commands').init(require('./todos').init(require('./storage')));

// Version.
app.cmd(/version/, commands.version);

// Lists all todo items.
app.cmd(/ls/, commands.list);

// Clears the whole todo.
app.cmd(/clear/, commands.clear);

// Marks a todo item as done.
app.cmd(/check ([\d]+)/, commands.check);

// Marks a todo item as not done yet.
app.cmd(/undo ([\d]+)/, commands.undo);

// Removes a todo item.
app.cmd(/rm ([\d]+)/, commands.destroy);

// Writes todo to file.
app.cmd(/write (.+)/, commands.write);

// Adds new todo item.
app.cmd(/(.+)/, commands.add);