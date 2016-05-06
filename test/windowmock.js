!function() {
  function Location(mock) {
    this.mock = mock;
    this._href = '';
    this._hash = '';
  }

  Location.prototype = {};
  Location.prototype.replace = function(v) {
    if (v[0] !== '#')
        throw new Error('hash must start with #, got "' + v + '"');
    this._hash = v.substr(1);
    var history = this.mock.history;
    history[history.length-1] = this.href;
    this.trigger();
  };

  Location.prototype.trigger = function() {
    var h = this.mock.handlers['hashchange'];
    h.forEach(function(f) {
      f();
    });
  };

  Object.defineProperty(Location.prototype, 'href', {
    get: function() { return '#' + this.hash; },
  });

  Object.defineProperty(Location.prototype, 'hash', {
    get: function()  { return this._hash; },
    set: function(v) {
      if (v[0] !== '#')
        throw new Error('hash must start with #, got "' + v + '"');
      this._hash = v.substr(1);
      this.mock.history.push(this.href);
      this.trigger();
    },
  });

  function Mock() {
    this.location = new Location(this);
    this.handlers = {};
    this.history = [];
  }

  Mock.prototype = {};
  Mock.prototype.addEventListener = function(ev, fn) {
    if (!(ev in this.handlers)) {
      this.handlers[ev] = [];
    }
    this.handlers[ev].push(fn);
  };

  window.Mock = Mock;
  window.Mock.Location = Location;
}();
