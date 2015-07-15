window.location.hash = '#';

Array.prototype.last = function() {
  return this[this.length-1];
};

var assert = function(k) {
  if (!k) {
    throw new Error('falsy!');
  }
}

beforeEach(function() {
  Stateless.clear();
  beforeEach(function() {
    Stateless.clear();
  });
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
  it('skips identical hashes', function(done) {
    var stack = [];
    Stateless.onChange(function(frag) {
      stack.push(frag);
    });
    Stateless.skip('abc');
    Stateless.push('abc');
    setTimeout(function() {
      assert(stack.last() !== 'abc')
      done();
    }, 15);
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
    var stack = [];
    var handler = function(frag) {
      stack.push(frag);
    }
    Stateless.off(handler);
    Stateless.onChange(function() {
      assert(stack.last() !== 'ghi')
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
    var stack = [];
    Stateless.onChange(function(frag) {
      stack.push(frag);
    });
    window.addEventListener('hashchange', function() {
      assert(stack.last() !== 'jkl');
      done();
    });
    Stateless.clear();
    Stateless.push('jkl');
  });
});


describe('Stateless#replace', function() {
  it("doesn't modify the history", function(done) {
    Stateless.onChange(function() {
      assert(window.history.length === prevLength);
      done();
    });
    var prevLength = window.history.length;
    Stateless.replace('chr1');
  });
  it('replaces the hash fragment', function(done) {
    Stateless.onChange(function(frag) {
      assert(frag === 'chr2')
      done();
    });
    Stateless.replace('chr2');
  });
});
