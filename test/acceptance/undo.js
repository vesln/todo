describe('todo undo', function() {
  it('undoes a todo item', function(done) {
    cli()
    .exec('./todo add have less fun')
    .exec('./todo check 1')
    .exec('./todo undo 1')
    .run('ls')
    .stdout('1. have less fun')
    .code(0)
    .end(done);
  });

  it('errors when the supplied id is invalid', function(done) {
    cli()
    .run('undo 3')
    .stderr('todo: Cannot find a todo item with id "3"')
    .code(1)
    .end(done);
  });
});
