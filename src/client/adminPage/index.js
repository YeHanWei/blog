import Vue from 'vue'
import AdminApp from './admin-app'
import router from './router/index.js'
import vueResource from 'vue-resource'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(vueResource)

/**
 * 读取cookie
 * @param name 读取的名字
 * @return {string} 对应name的值
 */
function getCookie (name) {
  let cookieName = encodeURIComponent(name) + '='
  let start = document.cookie.indexOf(cookieName)
  let value = null
  if (start > -1) { // 属性名存在
    let end = document.cookie.indexOf(';', start)
    if (end === -1) { // 最后一个属性
      end = document.cookie.length
    }
    value = decodeURIComponent(document.cookie.substring(start + cookieName.length, end))
  }
  return value
}

Vue.prototype.setCookie = function (name, value, expireSeconds, path, domain, secure) {
  let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
  if (expireSeconds) {
    let _date = new Date()
    _date.setSeconds(_date.getSeconds() + expireSeconds)
    cookieText += '; expires=' + _date.toGMTString()
  }
  if (path) {
    cookieText += '; path=' + path
  }
  if (domain) {
    cookieText += '; domain=' + domain
  }
  if (secure) {
    cookieText += '; secure'
  }
  document.cookie = cookieText
}

Vue.prototype.delCookie = function (name, path, domain, secure) {
  this.setCookie(name, '', 0, path, domain, secure)
}

Vue.prototype.getCookie = getCookie

/* eslint-disable no-new */
new Vue({
  el: '#admin-app',
  router, // 注册路由
  store,  // 注册vuex
  components: { AdminApp },
  render (createElement) {
    return createElement(AdminApp)
  }
})
