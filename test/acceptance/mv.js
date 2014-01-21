describe('todo mv', function() {
  it('changes the ids of todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .exec('todo mv 1 2')
    .run('todo ls')
    .stdout('2. have more fun')
    .code(0)
    .end(done);
  });

  it('swaps ids of todo items', function(done) {
    cli()
    .exec('todo add first')
    .exec('todo add second')
    .exec('todo mv 1 2')
    .run('todo ls')
    .stdout('1. second\n2. first')
    .code(0)
    .end(done);
  });
});
