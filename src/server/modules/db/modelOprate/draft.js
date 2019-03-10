import tool from "../tools";

const model = require('../models/model')
const {connection, TYPE} = require('../models/connection')

let {Draft} = model;

module.exports = {
  saveDraft: saveDraft,
  getDraftList: getDraftList,
  getDraft: getDraft,
  deleteDraft: deleteDraft
}

/**
 * 保存、更新草稿
 * @param obj 草稿内容
 * @return {Promise<any>}
 */
function saveDraft(obj) {
  return new Promise((resolve, reject) => {
    // 有id，保存草稿
    if(obj.draft_id){
      let {time} = tool.createIdAadTime();
      Draft.update({
        draft_title: obj.draft_title,
        draft_content: obj.draft_content,
        draft_summary: obj.draft_summary,
        draft_time: time,
        draft_tags: obj.draft_tags,
      }, {where: {draft_id: obj.draft_id}}).then(() => {
        let iserr = false;
        resolve(iserr)
      }).catch((err) => {
        console.log(err)
        let iserr = true;
        reject(iserr)
      });
    } else { // 没有id，新建草稿
      let {id, time} = tool.createIdAadTime();
      Draft.create({
        draft_id: id,
        draft_title: obj.draft_title,
        draft_content: obj.draft_content,
        draft_summary: obj.draft_summary,
        draft_time: time,
        draft_tags: obj.draft_tags
      }).then(() => {
        let iserr = false;
        resolve(iserr)
      }).catch(err => {
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
    }
  })
}

// 获取草稿列表
function getDraftList() {
  return new Promise((resolve, reject) => {
    Draft.findAll({attributes: ['draft_id', 'draft_title', 'draft_time']}).then(rows => {
      let result = tool.handleResult(rows);
      resolve(result)
    }).catch(err => {
      throw err;
    })
  })
}

// 根据id获取草稿
function getDraft(id) {
  return new Promise((resolve, reject) => {
    Draft.findAll({where: {draft_id: id}}).then(rows => {
      let result = tool.handleResult(rows);
      resolve(result)
    }).catch(err => {
      throw err;
    })
  })
}

// 删除
function deleteDraft(id) {
  return new Promise((resolve, reject) => {
    Draft.destroy({where: {draft_id: id}}).then(() => {
      let iserr = false;
      resolve(iserr)
    }).catch(err => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  })
}

