(function(global){
  var previous = [null];
  var handlers = [];

  var fireHandlers = function(fragment) {
    for (var i = 0; i<handlers.length; i++) {
      handlers[i](fragment);
    }
  };

  /**
   * Removes the given handler from the registered
   * handlers.
   *
   * @param {Function} handler
   */
  var off = function(handler) {
    var idx = handlers.indexOf(handler);
    if (idx !== -1) {
      handlers.splice(idx, 1);
    }
  }

  /**
   * Clears the array of registered handlers.
   */
  var clear = function() {
    handlers.length = 0;
  };

  /**
   * Mark the state as processed- if the hash is
   * changed to the identical state then no Stateless
   * handlers will be fired. You do not need to prefix
   * the state with a hashtag.
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
   * state. Note that it is not necessary to
   * preceed your strings with '#'.
   *
   * @param {String} state
   */
  var push = function(state) {
    window.location.hash = state;
  };

  /**
   * Replaces the current hash with the given state.
   * Does not push another entry into the browser
   * history.
   *
   * @param {String} state
   */
  var replace = function(state) {
    window.location.replace('#' + state);
  }

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
      var fragment = hash.substring(1);
      fireHandlers(fragment);
      skip(fragment);
    }
  });

  global.Stateless = {
    off: off,
    push: push,
    pull: pull,
    skip: skip,
    replace: replace,
    onChange: onChange,
    clear: clear,
  };
})(this);
