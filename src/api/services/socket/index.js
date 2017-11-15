const { resolve } = require('bluebird')
const io = require('socket.io')()

io.on('connection', client => {
  client.emit('id', client.id)
})

module.exports = ({ port }) => resolve(io.listen(port) && io)
