describe('todo rm', function() {
  it('removes todo items by their id', function(done) {
    cli()
    .exec('./todo add have less fun')
    .exec('./todo add have more fun')
    .exec('./todo rm 1')
    .run('ls')
    .stdout('2. have more fun')
    .code(0)
    .end(done);
  });
});
