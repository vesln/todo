/*!
 * todo - Todos in the CLI like what.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */
 
/**
 * Commands namespace.
 * 
 * @type {Object}
 */
var commands = module.exports;

/**
 * Print alias.
 */
var print = console.log;

/**
 * The application.
 * 
 * @type {Object}
 */
var app = require('./app');

/**
 * Storage. Just an alias to application config.
 * 
 * @type {Object}
 */
var storage = require('./storage');

/**
 * Prints current version.
 * 
 * @api public
 */
commands.version = function() {
  print(require('../package.json').version);
};

commands.list = function() {
  
};

commands.check = function(item) {
  
};

commands.delete = function(item) {
  
};

commands.add = function(item) {
  console.log(item);
};