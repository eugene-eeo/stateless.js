/*!!
 * Stateless.js <http://github.com/eugene-eeo/stateless.js>
 * @author Eeo Jun
 * @version 0.1.0
 * Released under the MIT License
 */

(function(global){
  'use strict';
  var handlers = [];
  var previous = null;
  var hashRegex = /#.*$/;

  var fireHandlers = function(hash) {
    var fragment = hash.substring(1);
    for (var i = 0; i<handlers.length; i++) {
      handlers[i](fragment);
    }
    skip(fragment);
  };

  var getHash = function() {
    // Workaround for Firefox which automatically
    // decodes the hash fragment [bug:483304]
    return (hashRegex.exec(window.location.href) || '#')[0];
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
  };

  /**
   * Clears the array of registered handlers.
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
   * @param {String} state
   */
  var skip = function(state) {
    previous = '#' + state;
  };

  /**
   * Pull the current state from the URL, and
   * forcefully runs the handlers regardless
   * of whether the hash has changed.
   */
  var pull = function() {
    fireHandlers(getHash());
  };

  /**
   * Set the current hash fragment as the given
   * state. Note that it is not necessary to
   * preceed your strings with '#'.
   *
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
   * @param {String} state
   */
  var replace = function(state) {
    window.location.replace('#' + state);
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
  
  window.addEventListener('hashchange', function() {
    var hash = getHash();
    if (hash !== previous) {
      fireHandlers(hash);
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
