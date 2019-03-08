const {connection, ID_TYPE} = require('./connection')
const TYPE = require('sequelize')

let friendly_links = connection.define('friendly_links', {
  link_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  link_url: {
    type: TYPE.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isUrl: true
    }
  },
  link_name: {
    type: TYPE.STRING(200),
    allowNull: false,
    unique: true,
  },
  link_description: {
    type: TYPE.TEXT,
    allowNull: false
  }
})

friendly_links.sync().then(() => {}).catch(() => {});

module.exports = friendly_links
