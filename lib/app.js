/*!
 * todo - Todos in the CLI like what.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Module dependencies.
 */ 
var flatiron = require('flatiron');

/**
 * The application object.
 * 
 * @type {Object}
 */
var app = module.exports = flatiron.app;

/**
 * Commands.
 * 
 * @type {Object}
 */
var commands = require('./commands');

app.use(flatiron.plugins.cli, {
  usage: [
    '',
    'todo',
    '',
    'Author: Veselin Todorov <hi@vesln.com>'
  ]
});

// Version.
app.cmd(/version/, commands.version);

// Lists all todo items.
app.cmd(/ls/, commands.list);

// Marks a todo item as done.
app.cmd(/check (.+)/, commands.check);

// Marks a todo item as not done yet.
app.cmd(/undo (.+)/, commands.undo);

// Removes a todo item.
app.cmd(/rm (.+)/, commands.delete);

// Adds new todo item.
app.cmd(/(.+)/, commands.add);