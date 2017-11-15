module.exports = {
  catchHandler: res => ({ code, message }) => res.send(code || 500, { message }),
  ioEmitter: (socket, name, topic, data) => () => {
    const io = socket.of(name)
    io && io.emit(topic, data)
  },
}
