/**
 * Return whether `str` does not include
 * any strings in `arr`.
 *
 * @returns {Boolean}
 * @api private
 */

function excludes(str, arr) {
  return arr.filter(function(keyword) {
    return ~str.indexOf(keyword);
  }).length === 0;
}

/**
 * Return whether `str` includes one or more
 * strings in `arr`.
 *
 * @returns {Boolean}
 * @api private
 */

function includes(str, arr) {
  if (!arr.length) return true;
  return arr.filter(function(keyword) {
    return ~str.indexOf(keyword);
  }).length > 0;
}

/**
 * Return a function that could be used to determine
 * whether given string must be ignored or kept.
 *
 * Examples:
 *
 * ```js
 * var f = filter(['foo', '~bar']);
 *
 * f('foo') === true;
 * f('bar') === false;
 * f('foo baz') === true;
 * f('foo bar') === false;
 * f('something else') === false;
 * ```
 *
 * @param {Array} keywords
 * @returns {Function}
 * @api public
 */

module.exports = function filter(keywords) {
  var include = [];
  var exclude = [];

  (keywords || []).forEach(function(keyword) {
    if (keyword[0] === '~') {
      exclude.push(keyword.replace(/^~/, ''));
    } else {
      include.push(keyword);
    }
  });

  return function filter(str) {
    return includes(str, include) && excludes(str, exclude);
  };
};
