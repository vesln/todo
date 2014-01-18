describe('todo add', function() {
  it('adds a todo item', function(done) {
    cli()
    .run('add "Have more fun"')
    .code(0)
    .end(done);
  });
});
