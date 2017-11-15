class AlreadyExistsError extends Error {
  constructor() {
    super()
    this.message = 'Record already exists'
    this.code = 201
  }
}

module.exports = AlreadyExistsError
