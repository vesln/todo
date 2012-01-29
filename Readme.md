[![Build Status](https://secure.travis-ci.org/vesln/todo.png)](http://travis-ci.org/vesln/todo)

# todo - Todos in the CLI like what.

![screenshot](http://img580.imageshack.us/img580/684/todov.png)

## Description

Todo lists in the CLI.

## Synopsis

```   
   todo - Todos in the CLI like what.
   
   Usage:
   
          todo Go shopping. - Adds new item.
          todo ls.          - Lists not finished items.
          todo ls --all     - Lists all items.
          todo rm 1         - Removes #1 item.
          todo check 1      - Marks #1 item as done.
          todo undo 1       - Marks #1 item as not done yet.
          todo clear        - Clears the whole list.
          todo version      - Lib version.
   
   Author: Veselin Todorov <hi@vesln.com>
```   

## Requirements

- NPM (http://npmjs.org/)
- Node.js 0.6 (http://nodejs.org/)

## Install

```
$ npm install todo -g
```

## Tests

```
$ npm install
$ make test
```

## License

MIT License

Copyright (C) 2012 Veselin Todorov

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