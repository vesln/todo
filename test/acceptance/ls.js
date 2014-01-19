describe('todo ls', function() {
  it('lists added todo items', function(done) {
    cli()
    .exec('todo add have more fun')
    .run('todo ls')
    .stdout('1. have more fun')
    .code(0)
    .end(done);
  });

  describe('keyword1 keyword2', function() {
    it('lists the items that contain the given keyword(s)', function(done) {
      cli()
      .exec('todo add have more fun @tag')
      .exec('todo add another one')
      .run('todo ls another')
      .stdout('2. another one')
      .code(0)
      .end(done);
    });
  });

  describe('~keyword1 ~keyword2', function() {
    it('lists the items that do not contain the given keyword(s)', function(done) {
      cli()
      .exec('todo add have more fun @tag')
      .exec('todo add another one')
      .run('todo ls ~another')
      .stdout('1. have more fun @tag')
      .code(0)
      .end(done);
    });
  });

  describe('~keyword1 keyword2', function() {
    it('does not list items containing one keyword but not containing other', function(done) {
      cli()
      .exec('todo add have more fun @tag')
      .run('todo ls ~@tag @tag')
      .stdout('')
      .code(0)
      .end(done);
    });
  });

  describe('--done', function() {
    it('lists completed todos', function(done) {
      cli()
      .exec('todo add have more fun')
      .exec('todo check 1')
      .run('todo ls --done')
      .stdout('1. have more fun')
      .code(0)
      .end(done);
    });
  });

  describe('--all', function() {
    it('lists all todo items', function(done) {
      cli()
      .exec('todo add have more fun')
      .exec('todo add another one')
      .exec('todo check 1')
      .run('todo ls --all')
      .stdout('1. have more fun\n2. another one')
      .code(0)
      .end(done);
    });
  });
});
