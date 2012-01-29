/*!
 * todo - Todos in the CLI like what.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */
 
/**
 * Module dependencies.
 */
var sinon = require('sinon');

/**
 * Support.
 */
var storage = require('../lib/storage');

/**
 * The tests object.
 * 
 * @type {Object}
 */
var commands = require('../lib/commands');

describe('commands', function() {
  describe('.version()', function() {
    it('should be sane', function() {
      commands.version.should.be.ok
    });
  });
  
  describe('.list()', function() {
    it('should return list items', function(done) {
      var i = 0;
      var expected = 3;
      var out = '';
      
      sinon.stub(storage, 'get', function(key, cb) {
        cb(null, [{text: 'Foo', done: false}]);
      });
      
      sinon.stub(commands, 'print', function(text) {
        out += text;
        if (++i === expected) finish();
      });
      
      function finish() {
        out.should.eql('     #1  \u001b[31m✖\u001b[39m  Foo');
        commands.print.restore();
        storage.get.restore();
        done();
      };
      
      commands.list();
    });
  });
});