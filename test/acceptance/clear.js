describe('todo clear', function() {
  it('removes all todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .exec('todo clear <<< y')
    .run('todo ls')
    .stdout('')
    .code(0)
    .end(done);
  });

  it('asks before removing all todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .run('todo clear <<< n')
    .stdout('Are you sure? (y/n)')
    .stderr('Aborting...')
    .code(1)
    .end(done);
  });

  it('does not ask before removing the items when called with --force', function(done) {
    cli()
    .exec('todo add have more fun')
    .run('todo clear --force')
    .stdout('')
    .code(0)
    .end(done);
  });
});
