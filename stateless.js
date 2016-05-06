!function() {
  var Stateless = function(window) {
    'use strict';
    var skipped = {};
    var handlers = [];
    var hashRegex = /#(.*)$/;

    function fire(state) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](state);
      }
    };

    function getState() {
      // Workaround for Firefox which automatically
      // decodes the hash fragment [bug:483304]
      var hash = hashRegex.exec(window.location.href);
      return hash ? hash[1] : '';
    };

    window.addEventListener('hashchange', function() {
      var state = getState();
      if (skipped[state])
        delete skipped[state];
      else
        fire(getState());
    });

    return {
      // Control
      off: function (fn) {
        var idx = handlers.indexOf(fn);
        if (idx !== -1)
          handlers.splice(idx, 1);
      },
      clear:    function() { handlers = []; },
      skip:     function(s) { skipped[s] = true; },
      onChange: function(fn) { handlers.push(fn); },

      // Firing
      pull:    function() { fire(getState()); },
      push:    function(s) { window.location.hash = '#' + s; },
      replace: function(s) { window.location.replace('#' + s); },
    };
  };
  var s = Stateless(window);
  s.wrap = Stateless;
  window.Stateless = s;
}();
