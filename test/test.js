describe('Stateless', function() {
  it('adds a new event handler', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    assert(mock.handlers.hashchange);
  });

  describe('.push', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);

    it('sets the current location to the value', function() {
      wrap.push('abc');
      assert.equal(mock.location.href, '#abc');
    });

    it('adds a new history entry', function() {
      assert.deepEqual(mock.history, ['#abc']);
    });

    it('fires the handlers', function() {
      var hash;
      wrap.onChange(function(h) {
        hash = h;
      });
      wrap.push('def');
      assert.equal(mock.location.href, '#def');
      assert.equal(hash, 'def');
    });
  });
});
