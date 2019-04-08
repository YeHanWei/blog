import crypto from 'crypto-js'

const key = 'jdu5896d'    // 长度为8的字符串

// DES加密 Pkcs7填充方式
function encryptByDES(message) {
  const keyHex = crypto.enc.Utf8.parse(key)
  const encrypted = crypto.DES.encrypt(message, keyHex, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7
  })
  return encrypted.toString()
}

// DES解密
function decryptByDES(ciphertext) {
  const keyHex = crypto.enc.Utf8.parse(key)
  // direct decrypt ciphertext
  const decrypted = crypto.DES.decrypt({
    ciphertext: crypto.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7
  })
  return decrypted.toString(crypto.enc.Utf8)
}

export default {
  encryptByDES: encryptByDES,
  decryptByDES: decryptByDES
}
