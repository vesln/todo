/**
 * Help.
 *
 * Example:
 *
 *     $ todo
 *     $ todo --help
 *
 * @api public
 */

module.exports = function() {
  [
    '',
    '  todo: Todos in the CLI like what',
    '',
    '  Usage:',
    '',
    '    todo                     Print help',
    '    todo add Go shopping     Create a new todo item',
    '    todo ls                  Print all pending todo items',
    '    todo ls @tag             Print todo items containing "@tag"',
    '    todo ls ~@tag            Print todo items not containing "@tag"',
    '    todo ls --all            Print completed and pending todo items',
    '    todo ls --done           Print completed todo items',
    '    todo done 1              Mark #1 as completed',
    '    todo undo 1              Revert #1 to pending',
    '    todo rm 1                Remove #1 item',
    '    todo clear               Destroy all todo items',
    '',
    '  Environment variables:',
    '',
    '    TODO_FORMAT=pretty                Specify formatter (simple, pretty, mini) [default: simple]',
    '    TODO_DB_PATH=~/Dropbox/todo.json  Specify DB path [default: ~/.todo-db.json]',
    '',
  ].forEach(function(line) {
    console.log(line);
  });
};
