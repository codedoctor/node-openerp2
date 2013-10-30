should = require 'should'

describe 'WHEN loading the module', ->
  openErpPackage = require '../lib/index'

  it 'should exist', ->
    should.exist openErpPackage

  it 'should login', (done) ->
    settings =
      username: 'test'
      password: 'test'
      database: 'bitnami_openerp'
      host: '162.243.59.118'
      port: '8069'

    client = openErpPackage.client(settings)

    client.login (err,result) =>
      console.log "Error: #{err}" if err
      console.log "RESULT: #{JSON.stringify(result)}" if result

      done()