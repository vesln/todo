describe('todo add', function() {
  it('adds a todo item', function(done) {
    cli()
    .run('add "Have more fun"')
    .code(0)
    .end(done);
  });

  it('requires a todo item', function(done) {
    cli()
    .run('add')
    .stderr('todo: please enter a todo item')
    .code(1)
    .end(done);
  });
});
