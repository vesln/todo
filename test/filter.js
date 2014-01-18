var filter = require('../lib/filter');

describe(filter, function() {
  it('returns true when the there is nothing to compare', function() {
    filter([])('foo').should.be.true;
  });

  it('returns true when `str` contains the supplied keywords', function() {
    filter(['foo'])('foo bar').should.be.true;
  });

  it('returns true when `str` does not contain the excluded keywords', function() {
    filter(['~baz'])('foo bar').should.be.true;
  });

  it('returns false when `str` does not contain the supplied keywords', function() {
    filter(['baz'])('foo bar').should.be.false;
  });

  it('returns false when `str` does contains the excluded keywords', function() {
    filter(['~foo'])('foo bar').should.be.false;
  });
});
