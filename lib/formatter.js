/**
 * External dependencies.
 */

var load = require('refractory')(module, './formatters', '{{HOME}}/.todo/formatters');

/**
 * Load formatter with `name` and then subscribe it
 * to events emitted by `coord`.
 *
 * @param {String} formatter name
 * @param {EventEmitter} coordinator
 * @api public
 */

module.exports = function(name, coord) {
  var format = null;

  try {
    format = load(name);
  } catch(e) {
    if ('MODULE_NOT_FOUND' !== e.code) throw e;
    throw new Error('Unknown formatter: ' + name);
  }

  Object.keys(format).forEach(function(key) {
    coord.on(key, format[key]);
  });
};
