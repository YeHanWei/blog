const crypto = require('crypto')

const key = 'jdu5896d'    // 长度为8的字符串

// DES 加密
function desEncrypt (message) {
  const keyHex = new Buffer(key)
  const cipher = crypto.createCipheriv('des-cbc', keyHex, keyHex)
  let c = cipher.update(message, 'utf8', 'base64')
  c += cipher.final('base64')
  return c
}

// DES 解密
function desDecrypt (text) {
  const keyHex = new Buffer(key)
  const cipher = crypto.createDecipheriv('des-cbc', keyHex, keyHex)
  let c = cipher.update(text, 'base64', 'utf8')
  c += cipher.final('utf8')
  return c
}

export default {
  desEncrypt: desEncrypt,
  desDecrypt: desDecrypt
}
