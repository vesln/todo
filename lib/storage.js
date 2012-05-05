/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Module dependencies.
 */
var Storr = require('storr');
var path = require('path');

/**
 * Database path.
 *
 * @type {String}
 */
var db = path.join(__dirname, '..', 'data', 'db.json');

/**
 * Storage object.
 *
 * @type {Object}
 */
var storage = module.exports = new Storr(db);
