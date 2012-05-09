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

var Todos   = require('../lib/todos'),
    Storage = require('./support/fake_storage');

describe('todos', function() {
  var fake, todos, items;

  beforeEach(function() {
    fake = new Storage();
    todos = new Todos(fake);
    items = function(method) {
      var returned;
      todos[method](function(items) { returned = items; });
      return returned;
    };
  });

  describe('all', function() {
    it('runs a callback with all items', function() {
      fake.items = [1,2,3,4,5];
      items('all').should.eql([1,2,3,4,5]);
    });

    it('runs a callback with empty array if no items are preset', function() {
      fake.items = null;
      items('all').should.eql([]);
    });
  });

  describe('add', function() {
    it('adds an todo items', function() {
      todos.add("Text");

      var todo = items('all')[0];

      todo.text.should.eql("Text");
      todo.done.should.not.be.ok;
    });
  });

  describe('destroy', function() {
    it('removes an item with given index', function() {
      fake.items = [1,2,3,4,5];
      todos.destroy(1);
      items('all').should.eql([1,3,4,5]);
    });
  });

  describe('check', function() {
    it('can mark todo as done', function() {
      fake.items = [{done: false}];
      todos.check(0, true);
      items('all')[0].done.should.be.ok;
    });

    it('can mark todo as no done', function() {
      fake.items = [{done: true}];
      todos.check(0, false);
      items('all')[0].done.should.not.be.ok;
    });

    it("throws an error if todo doesn't not exits", function() {
      (function () { todos.check(0, false); }).should.throw(/There is no todo item with number/);
    });
  });

  describe("clear", function() {
    it("removes all items", function() {
      fake.items = [1,2,3];
      todos.clear();
      items('all').should.eql([]);
    });
  });

  describe("undone", function() {
    it("runs a callback with all undone items", function() {
      var done   = {done: true},
          undone = {done: false};

      fake.items = [done, undone, done, undone];
      items('undone').should.eql([undone, undone]);
    });
  });
});
