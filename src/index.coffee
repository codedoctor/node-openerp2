###
API Facade client
###

OpenErpClient = require('./open-erp-client')

module.exports =
  OpenErpClient: OpenErpClient
  client: (settings = {}) ->
    new OpenErpClient(settings)
