class NotFoundError extends Error {
  constructor(message) {
    super()
    this.message = message
    this.code = 404
  }
}

module.exports = NotFoundError
