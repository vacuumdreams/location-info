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
      driver: 'sqlite',
      migrations: `${__dirname}/../data/migrations`,
      data: [{
        name: 'user',
        path: `${__dirname}/../data/db/user.sqlite`,
      }],
    },
    socket: {
      port: process.env.PORT_IO || '8001',
    },
    location: {
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
      key: 'AIzaSyB8QtzWdd60x2Ry1YqI_0d_EXwFkuNfmr4',
    },
  },
}
