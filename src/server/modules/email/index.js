import email from 'nodemailer'
// import db from '../db/index'
import op from '../db/index'
import emsg from './message'
import DES from '../../../source/javascript/DES'

/**
 * 创建email传输器对象
 * 1. 读取数据表user中的邮箱及授权码
 * 2. 根据邮箱解释其smtp服务器
 * @return {Promise<{isEmailErr: boolean}>} || {Promise<obj>} 如果错误返回错误状态，如果成功返回传输器对象
 */
async function mailTransport(){
  let conf = await op.getEmail(); //读取数据表user，获取email及授权码
  if(conf.iserr === true){
    return {isEmailErr: true}
  } else {
    // 解释smtp服务器地址
    let subHost = /@\w+.\w+/g.exec(conf.result.email);
    let host = 'smtp.' + subHost.toString().substring(1);
    // 返回传输器对象
    return email.createTransport({
      host: host,
      port: 465,
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      auth: {
        user: conf.result.email,
        pass: DES.decryptByDES(conf.result.email_password)  // 对邮箱授权码进行解密再填入
      }
    });
  }
}

/**
 * 生成邮件内容（对象）
 * @param toAddress 接收方邮箱地址
 * @param content 发送的内容（主题及邮件内容）
 * @return {Promise<object>} 邮件内容text
 */
async function createOptions(toAddress, content){
  let conf = await db.getEmail();
  return {
    from        : conf.result.email,
    to          : toAddress,
    subject       : content.subject,
    text          : content.text
  }
}

exports.emailInit = function () {
  let isEmailErr;
  return new Promise(function (resolve, reject) {
    mailTransport().then((mailTransport) => {
      if(mailTransport.isEmailErr === true){
        isEmailErr = true;
        resolve(isEmailErr)
      } else {
        createOptions('1028207768@qq.com', emsg.blogInitMsg).then(options => {
          mailTransport.sendMail(options, function (err, msg) {
            if(err) {
              isEmailErr = true;
              console.log(err)
            } else {
              isEmailErr = false;
              console.log(msg)
            }
            resolve(isEmailErr);
          })
        });
      }
    });
  })
};
