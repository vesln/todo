/**
 * Columnate and align arrays of objects.
 *
 * Example:
 *
 * ```js
 * column([
 *   { foo: 'foo', bar: 'bar' },
 *   { foo: 'foooo', bar: 'barrr' },
 * ]);
 *
 * // =>
 * // [
 * //   { foo: 'foo  ', bar: 'bar  ' },
 * //   { foo: 'foooo', bar: 'barrr' },
 * // ];
 * ```
 *
 * @param {Array} array of objects with the same keys
 * @returns {Array}
 * @api public
 */

exports.column = function(arr) {
  var keys = Object.keys(arr[0]);
  var max = {};

  keys.forEach(function(key) {
    max[key] = 0;

    arr.forEach(function(item) {
      max[key] = Math.max(item[key].length, max[key]);
    });
  });

  return arr.map(function(line) {
    var obj = {};

    keys.forEach(function(key) {
      obj[key] = exports.ljust(line[key], max[key]);
    });

    return obj;
  });
};

/**
 * If `width` is greater than the length of `str`, return a new string of length `width`
 * with `str` left justified
 *
 * @param {String} str
 * @param {Number} width
 * @returns {String}
 * @api public
 */

exports.ljust = function(str, width) {
  str += '';
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
};
