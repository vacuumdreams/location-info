const { catchHandler, ioEmitter } = require('../../util')
const { AlreadyExistsError, NotFoundError } = require('../../errors')

module.exports = ({ storage, socket }) => ({ params: { name }, body: { address, lat, lng } }, res) =>
  storage.user.get('SELECT * FROM User WHERE name=?', name)
    .then(record => {
      if (!record) {
        throw new NotFoundError('Username does not exist')
      }
    })
    .then(() =>
      storage.user.get(
        'SELECT * FROM Location WHERE userName=? AND address=?',
        name, address
      ).then(location => {
        if (location) {
          throw new AlreadyExistsError();
        }
      })
    )
    .then(() => storage.user.run(
      'INSERT INTO Location (userName, address, lat, lng) VALUES (?, ?, ?, ?)',
      name, address, lat, lng
    ))
    .then(ioEmitter(socket, name, 'location:add', { address, lat, lng }))
    .then(() => res.send(200, { name, location: { address, lat, lng } }))
    .catch(catchHandler(res))
