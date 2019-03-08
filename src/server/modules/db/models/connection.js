let Sequelize = require('sequelize')
const config = require('../db.json')

const connection = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
  connection: connection,
  ID_TYPE: Sequelize.STRING(14),
  TYPE: Sequelize
}
