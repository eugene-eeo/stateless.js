(function(global){
  var previous = [null];
  var handlers = [];

  var fireHandlers = function(fragment) {
    for (var i = 0; i<handlers.length; i++) {
      handlers[i](fragment);
    }
  };

  var clear = function() {
    handlers.length = 0;
  };

  var skip = function(state) {
    previous[0] = '#' + state;
  };

  var pull = function() {
    var fragment = window.location.hash.substr(1);
    fireHandlers(fragment);
    skip(fragment);
  };

  var push = function(state) {
    var hash = '#' + state;
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  };

  var onChange = function(f) {
    handlers.push(f);
  };

  window.addEventListener('hashchange', function(ev) {
    var hash = window.location.hash;
    if (hash !== previous[0]) {
      var fragment = hash.substr(1);
      fireHandlers(fragment);
      skip(fragment);
    }
  });

  global.Stateless = {
    push: push,
    pull: pull,
    skip: skip,
    onChange: onChange,
    clear: clear,
  };
})(this);
