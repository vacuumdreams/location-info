const { applySpec } = require('ramda')
const del = require('./delete')
const post = require('./post')

module.exports = applySpec({ del, post })
