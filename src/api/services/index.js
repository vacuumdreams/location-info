const { applySpec, compose, keys, path } = require('ramda')
const Promise = require('bluebird')

const service = {
  storage: require('./storage'),
  socket: require('./socket'),
  location: require('./location'),
}

module.exports = ({ storage, socket, location }) =>
  Promise.all([
    service.storage(storage),
    service.socket(socket),
    service.location(location),
  ])
  .then(([ storage, socket, location ]) => ({
    storage,
    socket,
    location,
  }))
