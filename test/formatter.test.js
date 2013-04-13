/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Support.
 */
var should = require('chai').should();

/**
 * The tests object.
 *
 * @type {Object}
 */
var formatter = require('../lib/formatter');

describe('formatter', function() {
  describe('.format()', function() {
    it('formats finished items', function() {
      formatter.format({ text: 'Foo', done: true }, 0).should.eql('     #1  \u001b[32m✓\u001b[39m  Foo');
    });

    it('formats not finished items', function() {
      formatter.format({ text: 'Foo', done: false }, 0).should.eql('     #1  \u001b[31m✖\u001b[39m  Foo');
    });
  });
});
