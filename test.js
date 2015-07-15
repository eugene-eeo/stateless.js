beforeEach(function() {
  Stateless.clear();
});


var setupNotRan = function(done) {
  var stack = [];
  Stateless.onChange(function() {
    stack.push(1);
  });
  Stateless.clear();
  var handler = function() {
    window.removeEventListener("hashchange", handler);
    expect(stack).toEqual([]);
    done();
  };
  window.addEventListener("hashchange", handler, false);
}


describe('Stateless.clear', function() {
  it('clears the callback stack', function(done) {
    setupNotRan(done);
    Stateless.push('change');
  });
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

  describe('when the state is identical', function() {
    it('does not fire the handlers', function(done) {
      Stateless.clear();
      setupNotRan(done);
      Stateless.push('def');
    });
  });
});


describe('Stateless.pull', function() {
  it('fires the handlers', function(done) {
    window.location.hash = '123';
    Stateless.onChange(function(fragment) {
      expect(fragment).toEqual('123');
      done();
    });
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


describe('Stateless.skip', function() {
  it("doesn't fire handlers when state is identical",
     function(done) {
    setupNotRan(done);
    Stateless.skip('change1');
    Stateless.push('change1');
  });
  it("fires the handlers when the state is not identical",
     function(done) {
    Stateless.onChange(function(frag) {
      expect(frag).toEqual('change3');
      done();
    });
    Stateless.skip('change2');
    Stateless.push('change3');
  });
});


describe('Stateless.off', function() {
  it('removes the handler', function(done) {
    var stack = [];
    var handler = function() {
      stack.push(1);
    };
    Stateless.onChange(handler);
    Stateless.onChange(function() {
      expect(stack).toEqual([]);
      done();
    });
    Stateless.push('radical');
  });
});
