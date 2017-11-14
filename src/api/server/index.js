const { curry, keys } = require('ramda')
const { createServer } = require('restify')
const middlewares = require('./middlewares')
const routes = require('./routes')

module.exports = curry((config, services) => {
  const api = createServer()
  const mw = middlewares(config)
  const rt = routes(services)

  api.use(mw)

  keys(rt).forEach(path => {
    keys(rt[path]).forEach(method => {
      api[method](path, rt[path][method])
    })
  })

  api.listen(config.port, () => console.log(`API listening on ${config.port}`))
})

