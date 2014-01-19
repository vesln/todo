describe('todo help', function() {
  it('prints the help', function(done) {
    cli()
    .run('todo help')
    .stdout(/Usage/)
    .code(0)
    .end(done);
  });
});
