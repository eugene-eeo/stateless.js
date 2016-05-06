describe('Stateless', function() {
  it('adds a new event handler', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    assert(mock.handlers.hashchange);
  });

  describe('.onChange', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    var hash, called;
    wrap.onChange(function(h) {
      hash = h;
      called = true;
    });

    it('handlers are fired when location changes', function() {
      mock.location.hash = '#def';
      assert(called);
    });

    it('fires handlers with correct state', function() {
      assert.equal(hash, 'def');
    });
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
  });

  describe('.pull', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    var hash;
    wrap.onChange(function(h) { hash = h; });

    it('fires the handlers', function() {
      mock.location.hash = '#def';
      wrap.pull();
      assert.equal(hash, 'def');
    });
  });

  describe('.replace', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    mock.location.hash = '#abc';

    it('replaces the hash', function() {
      wrap.replace('def');
      assert.equal(mock.location.hash, 'def');
    });

    it('does not add another history entry', function() {
      assert.deepEqual(mock.history, ['#def']);
    });
  });

  describe('.skip', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    mock.location.hash = '#abc';
    var called;
    wrap.onChange(function(h) { called = true; });

    it('skips the same hash', function() {
      wrap.skip('def');
      wrap.push('def');
      assert(!called);
    });

    it('allows changes to be made to window.location', function() {
      assert.deepEqual(mock.history, ['#abc', '#def']);
    });

    it('only skips once', function() {
      wrap.push('def');
      assert(called);
    });
  });

  describe('.clear', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    var called;
    wrap.onChange(function(h) {
      called = true;
    });

    it('clears the handlers', function() {
      wrap.clear();
      wrap.push('def');
      assert(!called);
      mock.location.hash = '#abc';
      assert(!called);
      wrap.pull();
      assert(!called);
    });
  });

  describe('.off', function() {
    var mock = new Mock();
    var wrap = Stateless.wrap(mock);
    var fn = function(h) {
      fn.called = true;
    };
    wrap.onChange(fn);

    it('removes a specific handler', function() {
      wrap.off(fn);
      wrap.push('def');
      assert(!fn.called);
      mock.location.hash = '#def';
      assert(!fn.called);
      wrap.pull();
      assert(!fn.called);
    });
  });
});
