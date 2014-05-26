// Generated by CoffeeScript 1.7.1
(function() {
  var c, pg;

  c = require('multi-config');

  pg = require('pg');

  exports.setUp = function(app, cb) {
    var client;
    if (c.postgres == null) {
      return typeof cb === "function" ? cb() : void 0;
    }
    client = new pg.Client(c.postgres);
    return client.connect((function(_this) {
      return function(err) {
        if (err) {
          return cb(err);
        }
        app.postgres = client;
        return typeof cb === "function" ? cb() : void 0;
      };
    })(this));
  };

  exports.tearDown = (function(_this) {
    return function(app, cb) {
      if (app.postgres == null) {
        return typeof cb === "function" ? cb() : void 0;
      }
      if (app.postgres) {
        app.postgres.end();
        delete app.postgres;
      }
      return typeof cb === "function" ? cb() : void 0;
    };
  })(this);

}).call(this);
