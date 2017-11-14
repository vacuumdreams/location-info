const { applySpec } = require('ramda')

const user = require('./user')
const place = require('./place')

module.exports = applySpec({
  user,
  place,
})
