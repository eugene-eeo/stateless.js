(function(global){
  var previous = [null];
  var handlers = [];

  var fireHandlers = function(fragment) {
    for (var i = 0; i<handlers.length; i++) {
      handlers[i](fragment);
    }
  };

  /**
   * Clears the array of registered handlers.
   */
  var clear = function() {
    handlers.length = 0;
  };

  /**
   * Mark the state as processed- if the hash is
   * changed to the identical state then no
   * Stateless handlers will be fired.
   *
   * @param {String} state
   */
  var skip = function(state) {
    previous[0] = '#' + state;
  };

  /**
   * Pull the current state from the URL, and
   * forcefully runs the handlers regardless
   * of whether the hash has changed.
   */
  var pull = function() {
    var fragment = window.location.hash.substr(1);
    fireHandlers(fragment);
    skip(fragment);
  };

  /**
   * Set the current hash fragment as the given
   * state. Note that the '#' character will be
   * automatically added, thus it is not necessary
   * to preceed your strings with '#'.
   *
   * @param {String} state
   */
  var push = function(state) {
    window.location.hash = '#' + state;
  };

  /**
   * Register a Stateless handler. Handlers will
   * be passed the hash fragment after the hash
   * character.
   *
   * @param {Function} handler
   */
  var onChange = function(handler) {
    handlers.push(handler);
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
