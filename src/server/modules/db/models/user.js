const {connection} = require('./connection')
const TYPE = require('sequelize')

let users = connection.define('users', {
  account: {
    type: TYPE.STRING(16),
    primaryKey: true
  },
  password: {
    type: TYPE.TEXT,
    allowNull: false
  },
  email: {
    type: TYPE.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  email_password: {
    type: TYPE.TEXT,
    allowNull: false
  },
  name: {
    type: TYPE.STRING(20),
    allowNull: false
  },
  description: {
    type: TYPE.STRING(200),
    allowNull: true
  },
  about_me_md: {
    type: TYPE.TEXT,
    allowNull: true
  },
  about_me_html: {
    type: TYPE.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
})

users.sync().then(() => {}).catch(() => {});
module.exports = users
