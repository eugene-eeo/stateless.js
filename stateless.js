/*
 * stateless.js
 *
 * Licensed under the MIT License.
 */


(function(global){
  'use strict';
  var handlers = [];
  var previous = {};
  var hashRegex = /#(.*)$/;

  var fireHandlers = function(state) {
    for (var i = 0; i < handlers.length; i++) {
      handlers[i](state);
    }
  };

  var getState = function() {
    // Workaround for Firefox which automatically
    // decodes the hash fragment [bug:483304]
    return (hashRegex.exec(window.location.href) || '')[1];
  };

  /*
   * Register a Stateless handler.
   */
  var onChange = function(handler) {
    handlers.push(handler);
  };

  /*
   * Removes the given handler from the registered
   * handlers.
   */
  var off = function(handler) {
    var idx = handlers.indexOf(handler);
    if (idx !== -1) {
      handlers.splice(idx, 1);
    }
  };

  /*
   * Clears the array of registered handlers.
   */
  var clear = function() {
    handlers = [];
  };

  /*
   * Mark the state as processed- if the hash is
   * changed to the identical state, no Stateless
   * handlers will be fired.
   */
  var skip = function(state) {
    previous[state] = 1;
  };

  /* 
   * Pull the current state from the URL.
   * Forcefully runs the handlers regardless
   * of whether the hash has changed.
   */
  var pull = function() {
    fireHandlers(getState());
  };

  /*
   * Set the current hash fragment as the given
   * state.
   */
  var push = function(state) {
    window.location.hash = '#' + state;
  };

  /*
   * Replaces the current hash with the given state.
   * Does not push another entry into the browser
   * history.
   */
  var replace = function(state) {
    window.location.replace('#' + state);
  };

  window.addEventListener('hashchange', function() {
    var state = getState();
    if (previous[state])
      delete previous[state];
    else
      fireHandlers(state);
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
