/*
API Facade client
*/


(function() {
  var OpenErpClient;

  OpenErpClient = require('./open-erp-client');

  module.exports = {
    OpenErpClient: OpenErpClient,
    client: function(settings) {
      if (settings == null) {
        settings = {};
      }
      return new OpenErpClient(settings);
    }
  };

}).call(this);

/*
//@ sourceMappingURL=index.js.map
*/