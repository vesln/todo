describe('todo renumber', function() {
  it('renumbers all todos starting at 1', function(done) {
    cli()
    .exec('todo add have more fun')
    .exec('todo mv 1 2')
    .exec('todo renumber')
    .run('todo ls')
    .stdout('1. have more fun')
    .code(0)
    .end(done);
  });
});
