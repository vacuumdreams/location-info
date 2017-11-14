const { catchHandler } = require('../../util')
const { ConflictError } = require('../../errors')

module.exports = ({ storage }) => ({ body: { name } }, res) =>
  storage.user.get('SELECT * FROM User WHERE name=?', name)
    .then(record => {
      if (record) throw new ConflictError('Username already exists')
    })
    .then(() => storage.user.run(
      'INSERT INTO User (name) VALUES (?)',
      name
    ))
    .then(() => res.send(200, { name, locations: [] }))
    .catch(catchHandler(res))
