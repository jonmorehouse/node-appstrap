// Generated by CoffeeScript 1.6.3
(function() {
  var c, pg,
    _this = this;

  c = require('multi-config');

  pg = require('pg');

  exports.setUp = function(app, cb) {
    var client,
      _this = this;
    if (c.postgres == null) {
      return typeof cb === "function" ? cb() : void 0;
    }
    client = new pg.Client(c.postgres);
    return client.connect(function(err) {
      if (err) {
        return cb(err);
      }
      app.postgres = client;
      return typeof cb === "function" ? cb() : void 0;
    });
  };

  exports.tearDown = function(app, cb) {
    if (app.postgres == null) {
      return typeof cb === "function" ? cb() : void 0;
    }
    app.postgres.end();
    delete app.postgres;
    return typeof cb === "function" ? cb() : void 0;
  };

}).call(this);
