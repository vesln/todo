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

var sinon   = require('sinon'),
    init    = require('../lib/commands').init,
    Todos   = require('../lib/todos'),
    Storage = require('./support/fake_storage');

describe('commands', function() {
  var storage, commands;

  beforeEach(function() {
    storage = new Storage();
    commands = init(new Todos(storage));
  });

  describe('version', function() {
    it('is sane', function() {
      commands.version.should.be.ok;
    });
  });

  describe('list', function() {
    it('print list items', function(done) {
      storage.items = [{text: 'Foo', done: false}];

      sinon.stub(console, 'log', function(text) {
        text.should.eql("\n" + '     #1  \u001b[31m✖\u001b[39m  Foo' + "\n");
        console.log.restore();
        done();
      });

      commands.list();
    });
  });

  describe('check', function() {
    it('marks todo item as done', function() {
      storage.items = [{done: false}];

      commands.check(1);

      storage.items.should.eql([{done: true}]);
    });
  });

  describe('undo', function() {
    it('marks todo item as not done yet', function() {
      storage.items = [{done: true}];

      commands.undo(1);

      storage.items.should.eql([{done: false}]);
    });
  });

  describe('destroy', function() {
    it('removes an item', function() {
      storage.items = [1, 2];

      commands.destroy(1);

      storage.items.should.eql([2]);
    });
  });

  describe('add', function() {
    it('adds an item', function() {
      storage.items = [1];

      commands.add("Foo bar");

      storage.items[1].should.eql({text: 'Foo bar', done: false});
    });
  });

  describe('clear', function() {
    it('clear all todos', function() {
      storage.items = [1,2,3,4];

      commands.clear();

      storage.items.should.eql([]);
    });
  });
});
