describe('todo', function() {
  it('prints the help', function(done) {
    cli()
    .run('')
    .stdout(/Usage/)
    .code(0)
    .end(done);
  });
});
