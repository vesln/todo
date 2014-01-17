describe('todo check', function() {
  it('completes a todo item', function(done) {
    cli()
    .exec('./todo add have less fun')
    .exec('./todo check 1')
    .run('ls')
    .stdout('')
    .code(0)
    .end(done);
  });

  it('errors when the supplied id is invalid', function(done) {
    cli()
    .run('check 3')
    .stderr('todo: Cannot find a todo item with id "3"')
    .code(1)
    .end(done);
  });
});
