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

  it('can list todo items that contain given string', function(done) {
    cli()
    .unlink('/tmp/todos.txt')
    .exec('./todo add have more fun @tag')
    .exec('./todo add another one')
    .run('ls another')
    .stdout('another one')
    .code(0)
    .end(done);
  });
});
