module.exports = {
  catchHandler: res => ({ code, message }) => res.send(code || 500, { message }),
  ioEmitter: (socket, name, topic, data) => () => {
    const io = socket.sockets.connected[name]
    io && io.emit(`${name}/${topic}`, data)
  },
}
