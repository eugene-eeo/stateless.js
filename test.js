/* global Stateless,it,afterEach,describe */

window.location.replace('#');

var assert = function(k) {
  if (!k) {
    throw new Error('falsy!');
  }
};

afterEach(function() {
  Stateless.clear();
});


describe('Stateless#push', function() {
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


describe('Stateless#pull', function() {
  it('should fire the handlers synchronously', function() {
    var stack = [];
    Stateless.onChange(function() {
      stack.push(1);
    });
    Stateless.pull();
    Stateless.pull();
    assert(stack.length === 2);
  });
});


describe('Stateless#skip', function(done) {
  it('skips identical hashes', function(done) {
    Stateless.onChange(function(frag) {
      assert(false);
    });
    Stateless.skip('abc');
    Stateless.push('abc');
    setTimeout(function() {
      done();
    }, 0);
  });
  it('processes unidentical hash', function(done) {
    Stateless.onChange(function() {
      done();
    });
    Stateless.skip('abc');
    Stateless.push('def');
  });
});


describe('Stateless#off', function() {
  it('stops the handler from being fired', function(done) {
    var handler = function(frag) {
      assert(false);
    };
    Stateless.onChange(handler);
    Stateless.off(handler);
    Stateless.onChange(function() {
      done();
    });
    Stateless.push('ghi');
  });

  it('does nothing if the handler is not found', function(done) {
    Stateless.onChange(function() {
      done();
    });
    Stateless.off(undefined);
    Stateless.push('bas');
  });
});


describe('Stateless#clear', function() {
  it('clears all handlers', function(done) {
    Stateless.onChange(function(frag) {
      assert(false);
    });
    Stateless.clear();
    Stateless.push('jkl');
    setTimeout(function() {
      done();
    }, 0);
  });
});


describe('Stateless#replace', function() {
  it("doesn't modify the history", function(done) {
    Stateless.onChange(function() {
      assert(window.history.length === prevLength);
      done();
    });
    var prevLength = history.length;
    Stateless.replace('chr1');
  });
  it('fires the handlers', function(done) {
    Stateless.onChange(function(frag) {
      assert(frag === 'chr2');
      done();
    });
    Stateless.replace('chr2');
  });
  it('replaces the hash', function() {
    Stateless.replace('chr3');
    assert(window.location.hash === '#chr3');
  });
});
