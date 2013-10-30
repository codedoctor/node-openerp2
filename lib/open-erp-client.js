(function() {
  var OpenErpClient, xmlrpc, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  xmlrpc = require("xmlrpc");

  _ = require('underscore');

  module.exports = OpenErpClient = (function() {
    function OpenErpClient(settings) {
      this.login = __bind(this.login, this);
      _.extend(this, settings);
      if (!this.host) {
        throw new Error("settings.host argument missing. ");
      }
      if (!this.port) {
        throw new Error("settings.port argument missing. ");
      }
      if (!this.database) {
        throw new Error("settings.database argument missing. ");
      }
      if (!this.username) {
        throw new Error("settings.username argument missing. ");
      }
      if (!this.password) {
        throw new Error("settings.password argument missing. ");
      }
      this.rpc_db = xmlrpc.createClient({
        host: this.host,
        port: this.port,
        path: "/xmlrpc/db"
      });
      this.rpc_common = xmlrpc.createClient({
        host: this.host,
        port: this.port,
        path: "/xmlrpc/common"
      });
      this.rpc_object = xmlrpc.createClient({
        host: this.host,
        port: this.port,
        path: "/xmlrpc/object"
      });
    }

    OpenErpClient.prototype.login = function(cb) {
      var args,
        _this = this;
      args = [this.database, this.username, this.password];
      return this.rpc_common.methodCall("login", args, function(err, result) {
        if (err) {
          return cb(err);
        }
        switch (result) {
          case undefined:
            return cb(new Error('Connection error'));
          case false:
            return cb(new Error("Could not open session for usernmae " + _this.username + " against database " + _this.database));
          default:
            _this.userId = result;
            return cb(null, {
              userId: _this.userId
            });
        }
      });
    };

    return OpenErpClient;

  })();

}).call(this);

/*
//@ sourceMappingURL=open-erp-client.js.map
*/