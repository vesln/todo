/*!
 * todo - Todos in the CLI like what.
 *
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Test dependencies.
 */
var flatiron = require('flatiron');

/**
 * The tests object.
 *
 * @type {Object}
 */
var app = require('../lib/app');

describe('app', function() {
  it('should be flatiron app', function() {
    app.should.eql(flatiron.app);
  });
});
