const {connection} = require('./connection')
const TYPE = require('sequelize')

let users = connection.define('users', {
  account: {                // 账号
    type: TYPE.STRING(16),
    primaryKey: true
  },
  password: {               // 密码
    type: TYPE.TEXT,
    allowNull: false
  },
  email: {                  // 邮箱账号
    type: TYPE.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  email_password: {         // 邮箱授权码
    type: TYPE.TEXT,
    allowNull: false
  },
  name: {                   // 博主昵称
    type: TYPE.STRING(20),
    allowNull: true
  },
  blog_title: {             // 博客标题
    type: TYPE.STRING(200),
    allowNull: true
  },
  blog_sub_title: {         // 博客子标题
    type: TYPE.TEXT,
    allowNull: true
  },
  blog_footer: {            // 博客页脚
    type: TYPE.TEXT,
    allowNull: true
  },
  about_me_md: {            // 关于我md格式
    type: TYPE.TEXT,
    allowNull: true
  },
  about_me_html: {          // 关于我html格式
    type: TYPE.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
})

users.sync().then(() => {}).catch(() => {});
module.exports = users
