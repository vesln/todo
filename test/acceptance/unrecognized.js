describe('todo unrecognized-command', function() {
  it('errors with useful message', function(done) {
    cli()
    .run('todo this-is-invalid')
    .stderr('todo: Unrecognized command "this-is-invalid"')
    .code(1)
    .end(done);
  });
});
