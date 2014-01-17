describe('todo invalid-command', function() {
  it('errors with useful message', function(done) {
    cli()
    .run('this-is-invalid')
    .stderr('todo: Unrecognized command "this-is-invalid"')
    .code(1)
    .end(done);
  });
});
