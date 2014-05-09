bootstrap = require "../bootstrap"
c = require 'node-config'
App = libRequire "app"

module.exports = 

  setUp: (cb) =>
    c.loadFromEnv ["LOGGLY_CUSTOMER_TOKEN", "LOGGLY_SUBDOMAIN", "LOGGLY_USERNAME", "LOGGLY_PASSWORD"]
    cb?()

  tearDown: (cb) =>

    cb?()

  logglyTest: (test) =>

    # basic 
    @obj =
      token: c.logglyCustomerToken
      subdomain: c.logglySubdomain
      username: c.logglyUsername
      password: c.logglyPassword
      tags: ["app-bootstrap-test"]

    appBootstrap {loggly: @obj}, (app) =>

      # make sure loggers were set correctly
      test.equals app.loggly?, true
      test.equals app.log?, true

      # actually try to log and make sure it works
      app.log "msg", (err, msg) =>
        test.notEqual err?, true
        test.deepEqual msg, {response: "ok"}
        do test.done

