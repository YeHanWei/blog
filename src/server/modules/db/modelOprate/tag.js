import tool from "../tools";

const model = require('../models/model')
const {connection, TYPE} = require('../models/connection')

let {Articles, Comments, TagArticles, Tags} = model;

module.exports = {
  addTag: addTag,
  getTags: getTags,
  deleteTag: deleteTag,
  updateTag: updateTag,
  getTagArticles: getTagArticles
}

/**
 * 添加标签记录
 * @param tag object，包含属性tag_name，tag_description
 * @return {Promise<boolean>} 操作是否成功，成功：false；失败：true
 */
function addTag(tag) {
  let tag_id = tool.createIdAadTime().id;
  return new Promise((resolve, reject) => {
    Tags.create({
      tag_id: tag_id,
      tag_name: tag.tag_name,
      tag_description: tag.tag_description
    }).then(() => {
      let iserr = false;
      resolve(iserr)
    }).catch(() => {
      let iserr = true;
      reject(iserr);
    })
  })
}

/**
 * 获取标签列表
 * @return {Promise<Object>} 成功：查询结果数组及状态false；失败：状态true
 */
function getTags() {
  return new Promise((resolve, reject) => {
    Tags.findAll().then(rows => {
      let result = tool.handleResult(rows);
      resolve({iserr: false, result: result})
    }).catch(err => {
      reject({iserr: true})
    })
  })
}

/**
 * 删除tags表和tag_articles表中tag_id为id的标签
 * @param id 要删除的标签id
 * @return {Promise<boolean>} 删除是否成功，成功：false；失败：true
 */
function deleteTag(id) {
  return new Promise((resolve, reject) => {
    connection.transaction().then((t) => {
      return TagArticles.destroy({ where: { tag_id: id } }, {transaction: t}).then(() => {
        return Tags.destroy({ where: { tag_id: id } }, {transaction: t}).then(() => {
          let iserr = false;
          resolve(iserr)
        })
      })
    }).catch(() => {
      let iserr = true;
      reject(iserr)
    })
  })
}

/**
 * 更新tag标签
 * @param tag 更新的标签信息
 * @return {Promise<boolean>} 操作状态，成功：false；失败：true
 */
function updateTag(tag) {
  return new Promise((resolve, reject) => {
    Tags.update({
      tag_name: tag.tag_name,
      tag_description: tag.tag_description
    }, { where: {tag_id: tag.tag_id} }).then(() => {
      let iserr = false;
      resolve(iserr)
    }).catch((err) => {
      let iserr = true;
      reject(iserr);
    })
  })
}

function getTagArticles() {
  // 内部函数，获取标签对应的文章
  function getArticle(resultArray, index, tagsArray, sucCallback, errCallback) {
    if (index < tagsArray.length) {
      connection.query( "select articles.article_id, articles.article_title from articles, tag_articles " +
        "where articles.article_id=tag_articles.article_id and tag_articles.tag_id=?;", {
        replacements: [tagsArray[index].tag_id], type: TYPE.QueryTypes.SELECT
      }).then(articles => {
        console.log(articles);
        resultArray.push({tag_name: tagsArray[index].tag_name, articles: articles});
        return getArticle(resultArray, ++index, tagsArray, sucCallback, errCallback);
      }).catch(err => {
        errCallback(err)
      })
    } else {
      sucCallback();
    }
  }
  return new Promise((resolve, reject) => {
    getTags().then(obj => {
      let result = obj.result,
        tagArticles = [];
      getArticle(tagArticles, 0, result,
        () => {
          resolve(tagArticles)
        }, (err) => {
          throw err
        });
    }).catch(err => {
      throw err;
    })
  })
}

