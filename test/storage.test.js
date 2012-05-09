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
  it('is Storr object', function() {
    storage.constructor.should.eql(Storr);
  });
});
