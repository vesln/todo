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
var path = require('path');

/**
 * The tests object.
 *
 * @type {Object}
 */
var cli = require('../lib/cli');

/**
 * Support.
 */
var storage = require('../lib/storage');
var commands = require('../lib/commands');

describe('cli', function() {
  it('exposes flatiron app', function() {
    cli.should.eql(flatiron.app);
  });

  it('registers routes', function() {
    cli.router.routes.version.on.should.eql(commands.version);
    cli.router.routes.ls.on.should.eql(commands.list);
    cli.router.routes.clear.on.should.eql(commands.clear);
    cli.router.routes.rm['(.+)'].on.should.eql(commands.destroy);
    cli.router.routes.check['(.+)'].on.should.eql(commands.check);
    cli.router.routes.undo['(.+)'].on.should.eql(commands.undo);
    cli.router.routes['(.+)'].on.should.eql(commands.add);
  });
});
