describe('todo ls', function() {
  it('lists added todo items', function(done) {
    cli()
    .unlink('/tmp/todos.txt')
    .exec('./todo add have more fun')
    .run('ls')
    .stdout(/have more fun/)
    .code(0)
    .end(done);
  });

  it('can list todo items with given tag', function(done) {
    cli()
    .unlink('/tmp/todos.txt')
    .exec('./todo add have more fun @tag')
    .exec('./todo add another one')
    .run('ls @tag')
    .stdout('have more fun @tag')
    .code(0)
    .end(done);
  });
});
