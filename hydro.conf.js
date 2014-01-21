/**
 * External dependencies.
 */

var nixt = require('nixt');
var join = require('path').join;
var fs = require('fs');

/**
 * TMP path.
 */

var tmp = join(__dirname, 'test', 'tmp');

/**
 * Return a new `nixt` instance pointing
 * to the todo bin.
 *
 * @returns {Object}
 * @api public
 */

function cli() {
  var bin = join(__dirname, 'bin');
  var db = join(tmp, 'todos.json');
  var path = bin + ':' + process.env.PATH;

  return nixt()
    .cwd(bin)
    .env('TODO_FORMAT', 'mini')
    .env('TODO_DB_PATH', db)
    .env('PATH', path);
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
      plugins: [ 'jack-chai' ],
    },
    globals: {
      cli: cli,
    },
    cleanDir: {
      keepDot: true,
      paths: [ tmp ]
    },
    plugins: [
      'hydro-bdd',
      'hydro-chai',
      'hydro-jack',
      'hydro-clean-dir',
      'hydro-timekeeper',
    ],
    tests: [
      'test/*.js',
    ]
  });
};
