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

app.cmd(/version/, commands.version);
app.cmd(/ls/, commands.list);
app.cmd(/check (.+)/, commands.check);
app.cmd(/undo (.+)/, commands.undo);
app.cmd(/rm (.+)/, commands.delete);
app.cmd(/(.+)/, commands.add);