const fetch = require('node-fetch')
const { resolve } = require('bluebird')

const toPlace = (results = []) =>
  results.map(result => ({
    address: result.formatted_address,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
  }))

const processResult = result => toPlace(result && result.results)

module.exports = ({ url, key }) => resolve({
  get: (place) => fetch(`${url}?query=${place}&key=${key}`)
    .then(res => res.json())
    .then(processResult)
})