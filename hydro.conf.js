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
    plugins: [
      'hydro-bdd',
      'hydro-chai',
    ],
    tests: [
      'test/*.js',
    ]
  });
};
