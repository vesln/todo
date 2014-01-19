describe('todo add', function() {
  it('adds a todo item', function(done) {
    cli()
    .run('todo add "Have more fun"')
    .code(0)
    .end(done);
  });
});
