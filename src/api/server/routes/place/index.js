const { applySpec, curry } = require('ramda')
const get = require('./get')

module.exports = applySpec({ get })
