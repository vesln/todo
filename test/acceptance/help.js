describe('todo', function() {
  it('prints the help', function(done) {
    cli()
    .run('./todo')
    .stdout(/Usage/)
    .code(0)
    .end(done);
  });
});
