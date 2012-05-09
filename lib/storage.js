/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Dependencies.
 */
var Storr = require('storr');
var path = require('path');

/**
 * Database path.
 *
 * @type {String}
 * @TODO: This should be configurable.
 */
var db = path.join(__dirname, '..', 'data', 'db.json');

/**
 * Storage.
 *
 * @type {Object}
 */
var storage = module.exports = new Storr(db);
