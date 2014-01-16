describe('todo ls', function() {
  it('lists added todo items', function(done) {
    cli()
    .exec('./todo add have more fun')
    .run('ls')
    .stdout(/have more fun/)
    .code(0)
    .end(done);
  });
});
