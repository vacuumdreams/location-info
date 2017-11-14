const { bodyParser, fullResponse } = require('restify-plugins')

module.exports = config => ([
  ...bodyParser(),
  fullResponse()
])
