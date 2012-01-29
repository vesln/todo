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
  
  describe('.check()', function(done) {
    it('should mark todo item as done', function(done) {
      sinon.stub(storage, 'get', function(key, cb) {
        cb(null, [{text: 'Foo', done: false}]);
      });
      sinon.stub(storage, 'set', function(key, value, cb) {
        key.should.eql('items');
        value.should.eql([ { text: 'Foo', done: true } ]);
        cb();
      });
      sinon.stub(storage, 'save', function(key, cb) {
        storage.set.restore();
        storage.get.restore();
        storage.save.restore();
        done();
      });
      commands.check(1);
    });
  });
  
  describe('.undo()', function(done) {
    it('should mark todo item as not done yet', function(done) {
      sinon.stub(storage, 'get', function(key, cb) {
        cb(null, [{text: 'Foo', done: true}]);
      });
      sinon.stub(storage, 'set', function(key, value, cb) {
        key.should.eql('items');
        value.should.eql([ { text: 'Foo', done: false } ]);
        cb();
      });
      sinon.stub(storage, 'save', function(key, cb) {
        storage.set.restore();
        storage.get.restore();
        storage.save.restore();
        done();
      });
      commands.undo(1);
    });
  });
  
  describe('.delete()', function(done) {
    it('should remove an item', function(done) {
      sinon.stub(storage, 'get', function(key, cb) {
        cb(null, [{text: 'Foo', done: true}]);
      });
      sinon.stub(storage, 'set', function(key, value, cb) {
        key.should.eql('items');
        value.should.eql([]);
        cb();
      });
      sinon.stub(storage, 'save', function(key, cb) {
        storage.set.restore();
        storage.get.restore();
        storage.save.restore();
        done();
      });
      commands.delete(1);
    });
  });
  
  describe('.add()', function(done) {
    it('should remove an item', function(done) {
      sinon.stub(storage, 'get', function(key, cb) {
        cb(null, [{text: 'Foo', done: true}]);
      });
      sinon.stub(storage, 'set', function(key, value, cb) {
        key.should.eql('items');
        value.should.eql([{text: 'Foo', done: true}, {text: 'Foo bar', done: false}]);
        cb();
      });
      sinon.stub(storage, 'save', function(key, cb) {
        storage.set.restore();
        storage.get.restore();
        storage.save.restore();
        done();
      });
      commands.add('Foo bar');
    });
  });
  
  describe('.clear()', function(done) {
    it('should clear the todo', function(done) {
      sinon.stub(storage, 'set', function(key, value, cb) {
        key.should.eql('items');
        value.should.eql([]);
        cb();
      });
      sinon.stub(storage, 'save', function(key, cb) {
        storage.set.restore();
        storage.save.restore();
        done();
      });
      commands.clear();
    });
  });
});