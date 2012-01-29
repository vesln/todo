/*!
 * todo - Todos in the CLI like what.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Test dependencies.
 */
var Storr = require('storr');

/**
 * The tests object.
 * 
 * @type {Object}
 */
var storage = require('../lib/storage');

describe('storage', function() {
  it('should be Storr object', function() {
    storage.constructor.should.eql(Storr);
  });
});