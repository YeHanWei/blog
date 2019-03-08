const {connection, ID_TYPE} = require('./connection')
const TYPE = require('sequelize')

let drafts = connection.define('drafts', {
  draft_id: {
    type: ID_TYPE,
    primaryKey: true
  },
  draft_title: {
    type: TYPE.TEXT,
    allowNull: false
  },
  draft_content: {
    type: TYPE.TEXT,
    allowNull: true,
  },
  draft_summary: {
    type: TYPE.TEXT,
    allowNull: true
  },
  draft_tags: {
    type: TYPE.TEXT,
    allowNull: true
  },
  draft_time: {
    type: TYPE.TEXT,
    allowNull: false
  }
})

drafts.sync().then(() => {}).catch(() => {});

module.exports = drafts
