const {connection, ID_TYPE} = require('./connection')
const TYPE = require('sequelize')

let articles = connection.define('articles', {
  article_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  article_title: {
    type: TYPE.STRING(200),
    allowNull: false,
    unique: true
  },
  article_md: {
    type: TYPE.TEXT,
    allowNull: false
  },
  article_html: {
    type: TYPE.TEXT,
    allowNull: false
  },
  article_summary: {
    type: TYPE.TEXT,
    allowNull: false
  },
  article_views: {
    type: TYPE.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  article_time: {
    type:TYPE.STRING(10),
    allowNull: false
  }
})

articles.sync().then(() => {}).catch(() => {})

module.exports = articles
