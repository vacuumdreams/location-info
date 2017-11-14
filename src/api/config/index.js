const host = process.env.HOST || 'http://localhost'
const port = process.env.PORT || '8000'

module.exports = {
  server: {
    name: 'location-api',
    url: `${host}:${port}`,
    port,
  },
  services: {
    storage: {

    },
    location: {
      key: 'AIzaSyB8QtzWdd60x2Ry1YqI_0d_EXwFkuNfmr4',
    },
  },
}
