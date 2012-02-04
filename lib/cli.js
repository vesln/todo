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
var app = module.exports = require('./app')

/**
 * Commands.
 *
 * @type {Object}
 */
var commands = require('./commands');

// Version.
app.cmd(/version/, commands.version);

// Lists all todo items.
app.cmd(/ls/, commands.list);

// Clears the whole todo.
app.cmd(/clear/, commands.clear);

// Marks a todo item as done.
app.cmd(/check (.+)/, commands.check);

// Marks a todo item as not done yet.
app.cmd(/undo (.+)/, commands.undo);

// Removes a todo item.
app.cmd(/rm (.+)/, commands.delete);

// Writes todo to file.
app.cmd(/write (.+)/, commands.write);

// Adds new todo item.
app.cmd(/(.+)/, commands.add);