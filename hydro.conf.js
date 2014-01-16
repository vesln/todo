/**
 * External dependencies.
 */

var nixt = require('nixt');
var join = require('path').join;

/**
 * Return a new `nixt` instance pointing
 * to the todo bin.
 *
 * @returns {Object}
 * @api public
 */

function cli() {
  return nixt()
    .cwd(join(__dirname, 'bin'))
    .base('./todo ');
}

/**
 * Test setup.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  hydro.set({
    formatter: 'hydro-doc',
    chai: {
      styles: 'should',
      stack: true,
    },
    globals: {
      cli: cli,
    },
    plugins: [
      'hydro-bdd',
      'hydro-chai',
    ],
    tests: [
      'test/*.js',
    ]
  });
};
