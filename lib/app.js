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
var path = require('path');

/**
 * The application object.
 * 
 * @type {Object}
 */
var app = module.exports = flatiron.app;

app.use(flatiron.plugins.cli, {
  usage: [
    '',
    'todo - Todos in the CLI like what.',
    '',
    'Usage:',
    '',
    '       todo Go shopping. - Adds new item.',
    '       todo init         - Init data dir at $HOME/.todo',
    '       todo ls.          - Lists not finished items.',
    '       todo ls --all     - Lists all items.',
    '       todo rm 1         - Removes #1 item.',
    '       todo check 1      - Marks #1 item as done.',
    '       todo undo 1       - Marks #1 item as not done yet.',
    '       todo clear        - Clears the whole list.',
    '       todo version      - Lib version.',
    '',
    'Author: Veselin Todorov <hi@vesln.com>'
  ]
});
