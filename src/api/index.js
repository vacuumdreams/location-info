const config = require('./config')
const services = require('./services')
const api = require('./server')

services(config.services)
.then(api(config.server))
