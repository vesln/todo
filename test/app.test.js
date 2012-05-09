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
 * Dependencies.
 */
var flatiron = require('flatiron');

/**
 * The tests object.
 *
 * @type {Object}
 */
var app = require('../lib/app');

describe('app', function() {
  it('is flatiron app', function() {
    app.should.eql(flatiron.app);
  });
});
