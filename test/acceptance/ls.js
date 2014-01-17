describe('todo ls', function() {
  it('lists added todo items', function(done) {
    cli()
    .exec('./todo add have more fun')
    .run('ls')
    .stdout('1. have more fun')
    .code(0)
    .end(done);
  });

  it('can list todo items that contain given string', function(done) {
    cli()
    .exec('./todo add have more fun @tag')
    .exec('./todo add another one')
    .run('ls another')
    .stdout('2. another one')
    .code(0)
    .end(done);
  });

  it('can list todo items not containing given string', function(done) {
    cli()
    .exec('./todo add have more fun @tag')
    .exec('./todo add another one')
    .run('ls ~another')
    .stdout('1. have more fun @tag')
    .code(0)
    .end(done);
  });

  it('can list todo items not containing one string and containing another', function(done) {
    cli()
    .exec('./todo add have more fun @tag')
    .exec('./todo add have more fun')
    .exec('./todo add another one')
    .run('ls ~another @tag')
    .stdout('1. have more fun @tag')
    .code(0)
    .end(done);
  });

  it('does not return todo items when both included and excluded', function(done) {
    cli()
    .exec('./todo add have more fun @tag')
    .run('ls ~@tag @tag')
    .stdout('')
    .code(0)
    .end(done);
  });

  it('can list completed todo items', function(done) {
    cli()
    .exec('./todo add have more fun')
    .exec('./todo check 1')
    .run('ls --done')
    .stdout('1. have more fun')
    .code(0)
    .end(done);
  });
});
