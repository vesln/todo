/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Dependencies.
 */
var flatiron = require('flatiron');

/**
 * Application.
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
    '       todo ls           - Lists not finished items.',
    '       todo ls --all     - Lists all items.',
    '       todo rm 1         - Removes #1 item.',
    '       todo check 1      - Marks #1 item as done.',
    '       todo undo 1       - Marks #1 item as not done yet.',
    '       todo clear        - Clears the whole list.',
    '       todo version      - Lib version.',
    '       todo write        - Write items to file.',
    '',
    'Author: Veselin Todorov <hi@vesln.com>',
    ''
  ]
});
