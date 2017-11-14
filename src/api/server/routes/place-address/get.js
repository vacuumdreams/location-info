const { escape } = require('querystring')
const { catchHandler } = require('../../util') 

const escapedSpace = escape(' ')

module.exports = ({ location }) => (req, res) =>
  location.get(escape(req.params.address).replace(escapedSpace, '+'))
    .then(json => res.send(200, json))
    .catch(catchHandler(res))
