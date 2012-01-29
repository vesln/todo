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
    'todo',
    '',
    'Author: Veselin Todorov <hi@vesln.com>'
  ]
});