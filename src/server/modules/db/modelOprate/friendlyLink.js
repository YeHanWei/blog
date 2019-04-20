import tool from "../tools";

const model = require('../models/model')

let {FriendlyLinks} = model;

module.exports = {
  getFriendlyLinks: getFriendlyLinks,
  addFriendlyLink: addFriendlyLink,
  deleteFriendlyLink: deleteFriendlyLink,
  updateFriendlyLink: updateFriendlyLink
};

/**
 * 新增友链
 * @param friendlyLink 新增的内容
 * @return {Promise<boolean>} 操作是否失败，成功：false；失败：true
 */
function addFriendlyLink(friendlyLink) {
  let link_id = tool.createIdAadTime().id;
  return new Promise((resolve, reject) => {
    FriendlyLinks.create({
      link_id: link_id,
      link_url: friendlyLink.link_url,
      link_name: friendlyLink.link_name,
      link_description: friendlyLink.link_description
    }).then(() => {
      resolve(false)
    }).catch((err) => {
      console.log(err);
      reject(true)
    })
  })
}

/**
 * 获取友链列表
 * @return {Promise<object>}
 */
function getFriendlyLinks() {
  return new Promise((resolve, reject) => {
    FriendlyLinks.findAll().then(rows => {
      let result = tool.handleResult(rows);
      resolve({iserr: false, result: result})
    }).catch(err => {
      console.log(err);
      reject({iserr: true})
    })
  })
}

/**
 * 删除友链
 * @param id 友链id
 * @return {Promise<boolean>} 操作是否失败，成功：false；失败：true
 */
function deleteFriendlyLink(id) {
  return new Promise((resolve, reject) => {
    FriendlyLinks.destroy({
      where: {link_id: id}
    }).then(() => {
      resolve(false)
    }).catch(err => {
      console.log(err);
      reject(true)
    })
  })
}

/**
 * 更新友链
 * @param friendlyLink 更新的数据（对象）
 * @return {Promise<boolean>} 操作状态，成功：false；失败：true
 */
function updateFriendlyLink(friendlyLink) {
  return new Promise((resolve, reject) => {
    FriendlyLinks.update({
      link_url: friendlyLink.link_url,
      link_name: friendlyLink.link_name,
      link_description: friendlyLink.link_description
    }, {where: {link_id: friendlyLink.link_id}}).then(() => {
      resolve(false)
    }).catch((err) => {
      console.log(err);
      reject(true)
    })
  })
}
