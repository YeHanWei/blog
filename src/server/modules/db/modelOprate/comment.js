import tool from "../tools";

const model = require('../model')
const {connection, TYPE} = require('../models/connection')

let {Comments} = model;

module.exports = {
  getComments: getComments,
  deleteComment: deleteComment,
  publicComment: publicComment
};

function getComments(article_id) {
  return new Promise((resolve, reject) => {
    if(arguments.length === 0){ // 不传入参数
      connection.query("select comment_id, comment_content, comment_username, comment_time, email, articles.article_id, article_title " +
        "from articles, comments where comments.article_id = articles.article_id;", {
        type: TYPE.QueryTypes.SELECT
      }).then((rows) => {
          console.log(rows);
        let iserr = false;
        resolve({iserr: iserr, rows: rows})
      }).catch(err => {
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
    } else { // 传入参数
      connection.query("select comment_id, comment_content, comment_username, comment_time, email, articles.article_id, article_title " +
        "from articles, comments where comments.article_id = articles.article_id and comments.article_id=?;", {
        replacements: [article_id], type: TYPE.QueryTypes.SELECT
      }).then((rows) => {
        console.log(rows);
        let iserr = false;
        resolve({iserr: iserr, rows: rows})
      }).catch(err => {
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
    }
  });// promise
}

function deleteComment(id) {
  return new Promise((resolve, reject) => {
    Comments.destroy({where: {comment_id: id}}).then(() => {
      let iserr = false;
      resolve(iserr)
    }).catch(err => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  })
}

function publicComment(obj) {
  return new Promise((resolve, reject) => {
    let comment_id = tool.createIdAadTime().id;
    let comment_time = tool.createIdAadTime().date;
    Comments.create({
      comment_id: comment_id,
      article_id: obj.article_id,
      comment_username: obj.comment_username,
      comment_content: obj.comment_content,
      comment_time: comment_time,
      email: obj.comment_email
    }).then(() => {
      let iserr = false;
      resolve(iserr);
    }).catch(err => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  });
}
