const config = require('./config')
const services = require('./services')
const api = require('./server')

api(config, services(config))
