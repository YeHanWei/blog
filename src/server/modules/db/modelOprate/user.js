const model = require('../models/model');
const {connection} = require('../models/connection');

module.exports = {
  blogInit: blogInit,
  userInit: userInit,
  getEmail: getEmail,
  getAccountPwd: getAccountPwd,
  updatePwd: updatePwd,
  updateEmail: updateEmail,
  updateAboutMe: updateAboutMe,
  getAboutMe: getAboutMe
};


let Users = model.Users;

/**
 * 博客初始化
 * 先删除所有的表，然后重建
 * @return {Promise<boolean>} 操作是否成功，成功返回false，失败返回true
 */
function blogInit() {
  return new Promise((resolve, reject) => {
    connection.drop().then(() => {
      model.sync().then((iserr) => {
        resolve(iserr)
      }).catch((iserr) => {
        reject(iserr)
      })
    }).catch((err) => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  })
}

/**
 * 初始化users表，向users表插入一条用户记录
 * @param user 用户数据对象
 * @return {Promise<boolean>} 操作是否成功，成功返回false，失败返回true
 */
function userInit(user) {
  return new Promise((resolve, reject) => {
    Users.create({
        account: user.account,
        password: user.password,
        email: user.email,
        email_password: user.email_password,
        name: user.account
      }).then(p => {
        console.log('created. ' + JSON.stringify(p));
        let iserr = false;
        resolve(iserr)
      }).catch(err => {
        console.log(err);
        let iserr = true;
        reject(iserr)
      })
  })
}

/**
 * 获取用户email及授权码
 * @return {Promise<Object>}
 */
function getEmail() {
  return new Promise((resolve, reject) => {
    Users.findOne({attributes: ['email', 'email_password']}).then((result) => {
      console.log(result);
      resolve({iserr: true, result: result.dataValues})
    }).catch(err => {
      reject({iserr: true})
    })
  });
}

/**
 * 获取用户账号密码
 * @return {Promise<Object>} 成功：查询结果；失败：true
 */
function getAccountPwd() {
  return new Promise((resolve, reject) => {
    Users.findOne({attributes: ['account', 'password']}).then(result => {
      resolve({result: result.dataValues})
    }).catch(err => {
      reject({iserr: true});
    })
  })
}

/**
 * 更改登陆密码
 * @param newPwd 新密码
 * @return {Promise<boolean>} 成功：false;失败：true;
 */
function updatePwd(newPwd) {
  return new Promise((resolve, reject) => {
    Users.update({
      password: newPwd
    }, {where: {}}).then(() => {
      resolve({iserr: false})
    }).catch(() => {
      reject({iserr: true})
    })
  })
}

/**
 * 更新邮箱及邮箱授权码
 * @param obj 包含email和email_password属性
 * @return {Promise<boolean>} 成功：false；失败：true
 */
function updateEmail(obj) {
  return new Promise((resolve, reject) => {
    Users.update({
      email: obj.email,
      email_password: obj.email_password
    }, {where: {}}).then(() => {
      resolve({iserr: false})
    }).catch(() => {
      reject({iserr: true})
    })
  })
}

/**
 * 更新aboutme
 * @param md about_me_md 列的值
 * @param html md about_me_html 列的值
 * @return {Promise<boolean>} 操作状态，成功：false; 失败：true
 */
function updateAboutMe(md, html) {
  return new Promise((resolve, reject) => {
    Users.update({
      about_me_html: html,
      about_me_md: md
    }, {where: {}}).then(() => {
      let iserr = false;
      resolve(iserr)
    }).catch(err => {
      console.log(err);
      let iserr = true;
      reject(iserr)
    })
  })
}

/**
 * 获取aboutme信息
 * @param type String aboutme的类型，md或html
 * @return {Promise<object>}
 */
function getAboutMe(type) {
  return new Promise((resolve, reject) => {
    Users.findOne({
      attributes: ['about_me_'+type]
    }).then(result => {
      resolve({iserr: false, about_me: result.dataValues['about_me_'+type]})
    }).catch(err => {
      console.log(err);
      reject({iserr: true})
    })
  })
}
