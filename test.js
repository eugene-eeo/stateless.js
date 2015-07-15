window.location.hash = '#';

assert = function(k) {
  if (!k) {
    throw new Error('falsy!');
  }
}

beforeEach(function() {
  Stateless.clear();
});


describe('Stateless#push()', function() {
  it('should fire the handlers', function(done) {
    Stateless.onChange(function(fragment) {
      assert(fragment === 'def');
      done();
    });
    Stateless.push('def');
  });

  it('should change the hash', function() {
    assert(window.location.hash === '#def');
  });
});


describe('Stateless#pull()', function() {
  var assertion = function() {
    it('should fire the handlers', function(done) {
      Stateless.onChange(function() {
        done();
      });
      Stateless.pull();
    });
  };
  describe('the state is unidentical', function() {
    window.location.hash = '#change';
    assertion();
  });
  describe('the state is identical', assertion);
});


describe('Stateless#skip()', function(done) {
  describe('given identical hash', function() {
    it('skips identical hashes', function(done) {
      var stack = [];
      Stateless.onChange(function(frag) {
        stack.push(frag);
      });
      Stateless.skip('abc');
      Stateless.push('abc');
      setTimeout(function() {
        assert(stack[stack.length-1] !== 'abc')
        done();
      }, 15);
    });
  });
  describe('given unidentical hash', function() {
    it('processes the hash', function(done) {
      Stateless.onChange(function() {
        done();
      });
      Stateless.skip('abc');
      Stateless.push('def');
    });
  });
});


describe('Stateless#off', function() {
  it('stops the handler from being fired', function(done) {
    var stack = [];
    var handler = function(frag) {
      stack.push(frag);
    }
    Stateless.off(handler);
    Stateless.onChange(function() {
      assert(stack[stack.length-1] !== 'ghi')
      done();
    });
    Stateless.push('ghi');
  });
});


describe('Stateless#clear', function() {
  it('clears all handlers', function(done) {
    var stack = [];
    Stateless.onChange(function(frag) {
      stack.push(frag);
    });
    window.addEventListener('hashchange', function() {
      assert(stack[stack.length-1] !== 'jkl');
      done();
    });
    Stateless.clear();
    Stateless.push('jkl');
  });
});
