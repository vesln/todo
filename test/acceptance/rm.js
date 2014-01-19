describe('todo rm', function() {
  it('removes todo items by their id', function(done) {
    cli()
    .exec('todo add have less fun')
    .exec('todo add have more fun')
    .exec('todo rm 1')
    .run('todo ls')
    .stdout('2. have more fun')
    .code(0)
    .end(done);
  });

  it('errors when the supplied id is invalid', function(done) {
    cli()
    .exec('todo add have less fun')
    .run('todo rm 2')
    .stderr('todo: Cannot find a todo item with id "2"')
    .code(1)
    .end(done);
  });
});
