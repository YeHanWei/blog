import tool from "../tools";

const model = require('../model')
const {connection, TYPE} = require('../models/connection')

let {Articles, Comments, TagArticles, Tags} = model;

module.exports = {
  getArticle: getArticle,
  publicArticle: publicArticle,
  deleteArticle: deleteArticle,
  getArchive: getArchive,
  getArticleDetail: getArticleDetail
}

/**
 * 获取文章列表，或获取一篇文章
 * @param id
 * @return {Promise<any>}
 */
function getArticle(id) {
  return new Promise((resolve, reject) => {
    if(arguments.length === 0) { // 获取所有文章的简要信息
      connection.query('select article_id,article_title,article_views,article_time, article_summary, ' +
        '(select count(*) from comments where comments.article_id=articles.article_id) as comments ' +
        'from articles order by article_time').then(rows => {
          resolve({iserr: false, rows: rows[0]});
        }
      ).catch(err => {
        console.log('获取文章列表失败')
        reject({iserr: true})
      })
    } else {  // 获取article_id=id 的文章相关信息
      Articles.findAll({where: {article_id: id}}).then(rows => {
        let result = tool.handleResult(rows);
        connection.query('select tag_name from tag_articles, tags where tag_articles.tag_id = tags.tag_id ' +
          'and tag_articles.article_id = ?;', {
          replacements: [id], type: TYPE.QueryTypes.SELECT
        }).then((rows) => {
          result[0].article_tags = [];
          for(let tag in rows) {
            result[0].article_tags.push(rows[tag].tag_name)
          }
          resolve({iserr: false, rows: result[0]});
        }).catch((err) => {
          console.log(err);
          let iserr = true;
          reject(iserr)
        })
      }).catch((err) => {
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
    }
  })
}

/**
 * 发布、更新文章
 * @param article 文章内容
 * @return {Promise<boolean>} 操作结果，成功：false；失败：true
 */
function publicArticle(article) {
  let {date} = tool.createIdAadTime();
  let id = article.article_id === undefined?tool.createIdAadTime().id:article.article_id;
  let tags = [];
  // 内部函数，检查标签是否存在
  function chackTag(articleTags, tags, index, errCallback, sucCallback) {
    if(articleTags.length === 0) {
      errCallback();
    }
    else if(index < articleTags.length) {
      Tags.findAll({
        where: {tag_name: articleTags[index]}
      }).then(rows => {
        let result = tool.handleResult(rows);
        if(result.length>0) {
          tags.push(...result);
          chackTag(articleTags, tags, ++index, errCallback, sucCallback)
        } else {
          console.log('标签'+articleTags[index]+'不存在');
          errCallback();
        }
      }).catch(err => {
        console.log(err);
        console.log('检查标签失败')
        errCallback()
      })
    } else {
      console.log('检查标签成功')
      sucCallback(tags);
    }
  }
  function addTagArticles(tags, article_id, index, sucCallback){
    if(index < tags.length){
      return connection.query('insert into tag_articles(article_id, tag_id) values(?,?);',{
        replacements: [article_id, tags[index].tag_id], type: TYPE.QueryTypes.INSERT
      }).then(() => {
        console.log("新增tag_articles表记录")
        return addTagArticles(tags, article_id, ++index, sucCallback)
        }
      )
    }
    else {
      sucCallback();
    }
  }
  // 函数返回 Promise
  return new Promise((resolve, reject) => {
    chackTag(article.tags, tags, 0, () => { // 失败回调
      // console.log('chackTag函数失败');
      let iserr = true;
      reject(iserr)
    }, (tags) => { // 成功回调
      console.log(tags)
      connection.transaction().then((t) => {
        console.log('事务开始')
        // 删除tag_articles表中对应的记录（如果存在）
        return TagArticles.destroy({where: {article_id: id}}, {transaction: t}).then(() => {
          console.log('删除tag_articles表中对应的记录')
          // 删除articles表中对应记录（如果存在）
          return Articles.destroy({where: {article_id: id}}, {transaction: t}).then(() => {
            console.log('删除articles表中对应记录')
            // 新增文章
            return Articles.create({
              article_id: id,
              article_title: article.article_title,
              article_md: article.article_md,
              article_html: article.article_html,
              article_summary: article.article_summary,
              article_time: date
            }).then(() => {
              console.log('新增文章')
              return addTagArticles(tags, id, 0, () => {
                let iserr = false;
                resolve(iserr)
              })
            })
          })
        })
      }).catch(err => {
        console.log('事务失败')
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
    })
  })
}

/**
 * 删除文章
 * @param id
 * @return {Promise<any>}
 */
function deleteArticle(id) {
  return new Promise((resolve, reject) => {
    connection.transaction().then((t) => {
      return Comments.destroy({where: {article_id: id}}, {transaction: t}).then(() => {
        return TagArticles.destroy({where: {article_id: id}}, {transaction: t}).then(() => {
          return Articles.destroy({where: {article_id: id}}, {transaction: t}).then(() => {
            let iserr = false;
            resolve(iserr)
          })
        })
      })
    }).catch(err => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  })
}

/**
 * 获取文章归档
 * @return {Promise<any>}
 */
function getArchive() {
  return new Promise((resolve, reject) => {
    Articles.findAll({attributes: ['article_id', 'article_title', 'article_time']}).then(rows => {
      let result = tool.handleResult(rows);
      console.log(result)
      resolve(result)
    }).catch(err => {
      throw err;
    })
  });
}

/**
 * 获取文章详细，增加文章阅读量
 * @param id
 * @return {Promise<any>}
 */
function getArticleDetail(id) {
  return new Promise((resolve, reject) => {
    Articles.findAll({where: {article_id: id}}).then((rows) => {
      let article = tool.handleResult(rows)[0];
      // 根据 id 查询tag_articls和tags，获取标签
      connection.query('select tags.tag_name from tag_articles, tags where ' +
        'tag_articles.tag_id=tags.tag_id and tag_articles.article_id=?;', {
        replacements: [id], type: TYPE.QueryTypes.SELECT
      }).then(_tags => {
        article.tags = _tags;
        // 获取文章评论
        Comments.findAll({where: {article_id: id}}).then(rows => {
          article.comments = tool.handleResult(rows);
          // 增加阅读量
          Articles.update({
            article_views: ++article.article_views
          }, {where: {article_id: id}} ).then(() => {
            resolve(article);
          }).catch(err => {
            throw err;
          })
        }).catch(err => {
          throw err;
        })
      }).catch(err => {
        throw err;
      })
    }).catch(err => {
      throw err;
    })
  })
}
