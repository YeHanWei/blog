const {connection, ID_TYPE} = require('./connection')
const TYPE = require('sequelize')

let comments = connection.define('comments', {
  comment_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  article_id: {
    type: ID_TYPE,
    allowNull: false
  },
  comment_content: {
    type: TYPE.TEXT,
    allowNull: false
  },
  comment_username: {
    type: TYPE.TEXT,
    allowNull: false
  },
  comment_time: {
    type: TYPE.TEXT,
    allowNull: false
  },
  email: {
    type: TYPE.TEXT,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

comments.sync().then(() => {}).catch(() => {});

module.exports = comments

