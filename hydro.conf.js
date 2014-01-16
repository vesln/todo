/**
 * External dependencies.
 */

var nixt = require('nixt');

/**
 * Return a new `nixt` instance pointing
 * to the todo bin.
 *
 * @returns {Object}
 * @api public
 */

function cli() {
  return nixt();
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
