beforeEach(function() {
  Stateless.clear();
});

describe('Stateless.push', function() {
  it('changes the hash fragment', function() {
    Stateless.push('abc');
    expect(window.location.hash).toEqual('#abc');
  });

  it('fires the handlers', function(done) {
    Stateless.onChange(function(fragment) {
      expect(fragment).toEqual('def');
      done();
    });
    Stateless.push('def');
  });
});


describe('Stateless.pull', function() {
  it('fires the handlers', function(done) {
    Stateless.onChange(function(fragment) {
      expect(fragment).toEqual('123');
      done();
    });
    window.location.hash = '123';
    Stateless.pull();
  });

  it('fires even if the state is identical', function(done) {
    Stateless.onChange(function() {
      expect(true).toEqual(true);
      done()
    });
    Stateless.pull();
  });
});
