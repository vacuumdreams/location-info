const sqlite = require('sqlite')
const { reduce } = require('ramda')
const Promise = require('bluebird')

module.exports = ({ data, migrations }) => Promise.all(
  data.map(({ path }) =>
    sqlite.open(path, { Promise, cached: true })
  )
).then(dbs => Promise.all(
  dbs.map(db => db.migrate({ force: 'last', migrationsPath: migrations }))
)).then(dbs =>
  data.reduce((acc, { name }, i) => ({
    ...acc,
    [name]: dbs[i],
  }), {})
)

// .then(({ user }) => {
//   console.log(user.get)
//   return ({ user })
// })
