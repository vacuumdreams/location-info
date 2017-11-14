const { resolve } = require('bluebird')
const io = require('socket.io')()

io.on('connection', ({ id }) => {
  client.emit('id', id)
})

module.exports = ({ port }) => resolve(io.listen(port) && io)
