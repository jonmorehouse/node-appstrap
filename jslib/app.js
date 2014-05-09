// Generated by CoffeeScript 1.6.3
(function() {
  var App, async, events,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  async = require('async');

  events = require('events');

  App = (function(_super) {
    __extends(App, _super);

    App.components = {
      rabbit: require("./rabbit"),
      postgresql: require("./postgres"),
      loggly: require("./loggly"),
      redis: require("./redis")
    };

    function App(cb) {
      this._caller = __bind(this._caller, this);
      var _this = this;
      App.__super__.constructor.apply(this, arguments);
      this._caller("setUp", function(err, app) {
        return cb(err, app);
      });
    }

    App.prototype.close = function(cb) {
      var _this = this;
      if (this.listeners("close").length > 0) {
        return this.emit("close", function() {
          return _this._caller("tearDown", cb);
        });
      } else {
        return this._caller("tearDown", cb);
      }
    };

    App.prototype._caller = function(method, cb) {
      var component, functions, key,
        _this = this;
      functions = (function() {
        var _ref, _results;
        _ref = App.components;
        _results = [];
        for (key in _ref) {
          component = _ref[key];
          _results.push(component[method]);
        }
        return _results;
      })();
      return async.each(functions, (function(method, cb) {
        return method(_this, cb);
      }), function(err) {
        if (err) {
          return cb(err);
        }
        return typeof cb === "function" ? cb(null, _this) : void 0;
      });
    };

    return App;

  })(events.EventEmitter);

  module.exports = App;

}).call(this);
