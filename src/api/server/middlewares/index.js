const { bodyParser, fullResponse } = require('restify-plugins')
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  origins: ['*'],
})

module.exports = config => ({
  pre: [
    cors.preflight,
  ],
  use: [
    ...bodyParser(),
    fullResponse(),
    cors.actual,
  ],
})
