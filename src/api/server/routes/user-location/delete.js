const { catchHandler, ioEmitter } = require('../../util')

module.exports = ({ storage, socket }) => ({ params: { name }, body: { address } }, res) =>
  storage.user.run(
    'DELETE FROM Location WHERE userName=? AND address=?',
    name, address
  )
  .then(ioEmitter(socket, name, 'location:remove', { address }))
  .then(() => res.send(204))
  .catch(catchHandler(res))
