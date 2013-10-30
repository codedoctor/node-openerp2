xmlrpc = require "xmlrpc"
_ = require 'underscore'

module.exports = class OpenErpClient
  constructor: (settings) ->
    _.extend @, settings

    throw new Error "settings.host argument missing. " unless @host
    throw new Error "settings.port argument missing. " unless @port
    throw new Error "settings.database argument missing. " unless @database
    throw new Error "settings.username argument missing. " unless @username
    throw new Error "settings.password argument missing. " unless @password

    @rpc_db = xmlrpc.createClient
      host: @host
      port: @port
      path: "/xmlrpc/db"
    @rpc_common = xmlrpc.createClient
      host: @host
      port: @port
      path: "/xmlrpc/common"

    @rpc_object = xmlrpc.createClient
      host: @host
      port: @port
      path: "/xmlrpc/object"


  login: ( cb) =>
    args = [@database, @username, @password]

    @rpc_common.methodCall "login", args, (err, result) =>
      return cb err if err
      switch result
        when `undefined`
          return cb new Error 'Connection error'
        when false
          return cb new Error "Could not open session for usernmae #{@username} against database #{@database}"
        else
          @userId = result
          
          cb null, userId : @userId

