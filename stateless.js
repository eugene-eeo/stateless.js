/*!!
 * Stateless.js <http://github.com/eugene-eeo/stateless.js>
 * @module Stateless
 * @version 0.1.0
 * @author Eeo Jun
 * Released under the MIT License
 */

/**
 * @namespace Stateless
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

  /**
   * Register a Stateless handler. Handlers will
   * be passed the hash fragment after the hash
   * character.
   *
   * @memberof Stateless
   * @param {Function} handler
   */
  var onChange = function(handler) {
    handlers.push(handler);
  };

  /**
   * Removes the given handler from the registered
   * handlers.
   *
   * @memberof Stateless
   * @param {Function} handler
   */
  var off = function(handler) {
    var idx = handlers.indexOf(handler);
    if (idx !== -1) {
      handlers.splice(idx, 1);
    }
  };

  /**
   * Clears the array of registered handlers.
   *
   * @memberof Stateless
   */
  var clear = function() {
    handlers = [];
  };

  /**
   * Mark the state as processed- if the hash is
   * changed to the identical state then no Stateless
   * handlers will be fired. You do not need to prefix
   * the state with a hashtag.
   *
   * @memberof Stateless
   * @param {String} state
   */
  var skip = function(state) {
    previous[state] = 1;
  };

  /**
   * Pull the current state from the URL, and
   * forcefully runs the handlers regardless
   * of whether the hash has changed.
   *
   * @memberof Stateless
   */
  var pull = function() {
    fireHandlers(getState());
  };

  /**
   * Set the current hash fragment as the given
   * state. Note that it is not necessary to
   * preceed your strings with '#'.
   *
   * @memberof Stateless
   * @param {String} state
   */
  var push = function(state) {
    window.location.hash = '#' + state;
  };

  /**
   * Replaces the current hash with the given state.
   * Does not push another entry into the browser
   * history.
   *
   * @memberof Stateless
   * @param {String} state
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
