import mysql from 'mysql'
import config from '../db.json'
import SQL from './SQL'
import article from './article'
import tag from './tag'
import friendlyLink from './friendlyLInk'
import comment from './comment'
import aboutMe from './aboutMe'
import draft from './draft'

module.exports = {
  blogInit: blogInit,
  getEmail: getEmail,
  userInit: userInit,
  getAccountPwd: getAccountPwd,
  getArticle: article.getArticle,
  publicArticle: article.publicArticle,
  deleteArticle: article.deleteArticle,
  getArchive: article.getArchive, // blog
  getArticleDetail: article.getArticleDetail,// blog
  addTag: tag.addTag,
  getTags: tag.getTags,
  deleteTag: tag.deleteTag,
  updateTag: tag.updateTag,
  getTagArticles: tag.getTagArticles, // blog
  addFriendlyLink: friendlyLink.addFriendlyLink,
  getFriendlyLinks: friendlyLink.getFriendlyLinks,
  deleteFriendlyLink: friendlyLink.deleteFriendlyLink,
  updateFriendlyLink: friendlyLink.updateFriendlyLink,
  getComments: comment.getComments,
  deleteComment: comment.deleteComment,
  publicComment: comment.publicComment,
  updateAboutMe: aboutMe.updateAboutMe,
  getAboutMe: aboutMe.getAboutMe,
  saveDraft: draft.saveDraft,
  getDraftList: draft.getDraftList,
  getDraft: draft.getDraft,
  deleteDraft: draft.deleteDraft
};

let pool = mysql.createPool(config);


/**
 * 初始化数据库
 * 1. 删除数据库中已有的表
 * 2. 新建数据表
 * @returns {Promise<boolean>} 操作是否成功状态
 */
function blogInit() {
  let iserr;  // 记录操作是否成功状态
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err){  // 数据库连接错误
        iserr = true;
        console.log(err);
        resolve(iserr);
      } else {
        console.log("connection is successful!");
        connection.query(SQL.deleteAllTables, function (err, result){
          if(err){  // 表删除错误
            iserr = true;
            console.log(err);
            resolve(iserr);
          } else {  // 新建数据表
            console.log("delet tables is successful!");
            for(let key in SQL.create) {
              connection.query(SQL.create[key], function (err, result) {
                if(err){
                  console.log(err);
                  iserr = true;
                  resolve(err);
                }
              });
            }
            if(iserr !== true){
              console.log("create tables is successful!");
              iserr = false;
              resolve(iserr);
            }
          }
        });
      }
    });
  });
}

/**
 * 从数据表user中获取email及授权码
 * @returns {Promise<object>} 操作是否成功状态和数据库读取结果
 */
function getEmail() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) { // 连接
      if(err){
        resolve({iserr: true})
      } else { // 读取
        connection.query('select email, email_password, name from user;', function (err, result) {
          if(err){
            console.log(err);
            resolve({iserr: true})
          } else {
            console.log("read user is successful!");
            // console.log(result[0].email_password);
            resolve({iserr: false, result: result[0]})
          }
        });
      }
    })
  });
}

/**
 * 向user表插入数据
 * @param user 对象，包含属性account, password, email, email_password
 * @return {Promise<boolean>} 操作是否成功状态
 */
function userInit(user) {
  let iserr = false;
  const value = [user.account, user.password, user.email, user.email_password, user.account];
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        iserr = true;
        console.log(err);
        resolve(iserr)
      } else {
        connection.query(SQL.insertUser, value, (err, result) => {
          if(err) {
            iserr = true;
            console.log(err);
            resolve(iserr)
          } else {
            console.log("insert user is successful!");
            resolve(iserr)
          }
        });
      }
    })
  });
}

// 获取账号密码，用于登陆验证
function getAccountPwd() {
  let iserr = false;
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        iserr = true;
        console.log(err);
        resolve({iserr: iserr})
      } else {
        connection.query('select account, password from user;', (err, result) => {
          if(err) {
            iserr = true;
            resolve({iserr: iserr})
          } else {
            resolve({iserr: iserr, result: result[0]})
          }
        });
      }
    })
  })
}


