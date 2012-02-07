/*!
 * todo - Todos in the CLI like what.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * The tests object.
 * 
 * @type {Object}
 */
var formatter = require('../lib/formatter');

describe('formatter', function() {
  describe('.format()', function() {
    it('should format done items properly', function() {
      formatter.format({ text: 'Foo', done: true }, 0).should.eql('     #1  \u001b[32m√\u001b[39m  Foo');
    });
    
    it('should format unfinished items properly', function() {
      formatter.format({ text: 'Foo', done: false }, 0).should.eql('     #1  \u001b[31m✖\u001b[39m  Foo');
    });
  });
});