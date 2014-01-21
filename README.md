[![Build Status](https://secure.travis-ci.org/vesln/todo.png)](http://travis-ci.org/vesln/todo)

# todo

## Usage

```
  todo: Todos in the CLI like what

  Usage:

    todo                     Print help
    todo add Go shopping     Create a new todo item
    todo ls                  Print all pending todo items
    todo ls @tag             Print todo items containing "@tag"
    todo ls ~@tag            Print todo items not containing "@tag"
    todo ls --all            Print completed and pending todo items
    todo ls --done           Print completed todo items
    todo done 1              Mark #1 as completed
    todo mv 1 42             Change the id of given todo
    todo undo 1              Revert #1 to pending
    todo rm 1                Remove #1 item
    todo clear               Destroy all todo items

  Environment variables:

    TODO_FORMAT=pretty                Specify formatter (simple, pretty, mini) [default: simple]
    TODO_DB_PATH=~/Dropbox/todo.json  Specify DB path [default: ~/.todo-db.json]
```

## Installation

```js
npm install todo -g
```

## License

MIT License

Copyright (c) 2012-2014 Veselin Todorov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
