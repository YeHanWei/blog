const {connection, ID_TYPE} = require('./connection')
const TYPE = require('sequelize')

// tags 表模型
let tags = connection.define('tags', {
  tag_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  tag_name: {
    type: TYPE.STRING(20),
    allowNull: false,
    unique: true
  },
  tag_description: {
    type: TYPE.TEXT,
    allowNull: true,
  }
})

tags.sync().then(() => {}).catch(() => {});

module.exports = tags;
