const { catchHandler } = require('../../util')
const { NotFoundError } = require('../../errors')

module.exports = ({ storage }) => ({ params: { name } }, res) =>
  storage.user.get('SELECT * FROM User WHERE name=?', name)
    .then(record => {
      if (!record) {
        throw new NotFoundError('Username does not exist')
      }
      return record
    })
    .then(user =>
      storage.user.all('SELECT * FROM Location WHERE userName=?', name)
        .then((locations = []) => ({
          ...user,
          locations: locations.map(({ address, lat, lng }) => ({ address, lat, lng })),
        }))
    )
    .then(({ name, locations }) => res.send(200, { name, locations }))
    .catch(catchHandler(res))
