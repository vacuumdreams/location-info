const { applySpec } = require('ramda')

const location = require('./location')
const storage = require('./storage')

module.exports = applySpec({
  location,
  storage,
})
