/**
 * External dependencies.
 */

var nixt = require('nixt');
var join = require('path').join;
var fs = require('fs');

/**
 * Return a new `nixt` instance pointing
 * to the todo bin.
 *
 * @returns {Object}
 * @api public
 */

function cli() {
  var bin = join(__dirname, 'bin');
  var tmp = join(__dirname, 'test', 'tmp', 'todos.json');
  var path = bin + ':' + process.env.PATH;

  return nixt()
    .cwd(bin)
    .env('TODO_FORMAT', 'mini')
    .env('TODO_DB_PATH', tmp)
    .env('PATH', path)
    .after(function() {
      try {
        fs.unlinkSync(tmp);
      } catch(e) {}
    });
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
      plugins: ['jack-chai'],
    },
    globals: {
      cli: cli,
    },
    plugins: [
      'hydro-bdd',
      'hydro-chai',
      'hydro-jack',
    ],
    tests: [
      'test/*.js',
    ]
  });
};
