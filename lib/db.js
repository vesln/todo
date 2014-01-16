/**
 * External dependencies.
 */

var fs = require('fs');

/**
 * Simple file-based database.
 *
 * @param {String} path to store the information
 * @constructor
 */

function Db(path) {
  this.path = path;
}

/**
 * Store given `str`.
 *
 * @param {String} str
 * @api public
 */

Db.prototype.write = function(str) {
  fs.writeFileSync(this.path, str, 'utf8');
};

/**
 * Return the contents of the database.
 *
 * @returns {String}
 * @api public
 */

Db.prototype.read = function() {
  return fs.readFileSync(this.path, 'utf8');
};

/**
 * Primary export.
 */

module.exports = Db;
