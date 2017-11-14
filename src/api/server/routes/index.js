const { applySpec } = require('ramda')

const user = require('./user')
const userName = require('./user-name')
const userLocation = require('./user-location')
const placeAddress = require('./place-address')

module.exports = applySpec({
  'user': user,
  'user/:name': userName,
  'user/:name/location': userLocation,
  'place/:address': placeAddress,
})
