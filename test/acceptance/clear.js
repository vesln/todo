var NODE_08 = process.version.indexOf('v0.8') === 0;

describe('todo clear', function() {
  it('removes all todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .exec('echo "y" | todo clear')
    .run('todo ls')
    .stdout('')
    .code(0)
    .end(done);
  }).skip(NODE_08);

  it('asks before removing all todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .run('echo "n" | todo clear')
    .stdout('Are you sure? (y/n)')
    .stderr('Aborting...')
    .code(1)
    .end(done);
  }).skip(NODE_08);

  it('does not ask before removing the items when called with --force', function(done) {
    cli()
    .exec('todo add have more fun')
    .run('todo clear --force')
    .stdout('')
    .code(0)
    .end(done);
  });
});
