/**
 * External dependencies.
 */

var fs = require('fs');

/**
 * Storage.
 *
 * Serialize and read from JSON files.
 *
 * @param {String} database path
 * @constructor
 */

function Storage(path) {
  this.path = path;
}

/**
 * Read the database and JSON.parse it.
 *
 * @returns {Mixed}
 * @api public
 */

Storage.prototype.read = function() {
  var ret = [];

  try {
    var contents = fs.readFileSync(this.path, 'utf8');
    ret = JSON.parse(contents);
  } catch(e) {}

  return ret;
};

/**
 * Stringify `data` and store it into a file.
 *
 * @param {Mixed} data
 * @api public
 */

Storage.prototype.write = function(data) {
  var json = JSON.stringify(data);
  fs.writeFileSync(this.path, json, 'utf8');
};

/**
 * Primary export.
 */

module.exports = Storage;
