

const {connection, ID_TYPE} = require('./connection')

let tagArticles = connection.define('tag_articles', {
  tag_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  article_id: {
    type: ID_TYPE,
    primaryKey: true
  }
})

tagArticles.sync().then(() => {}).catch(() => {});

module.exports = tagArticles
