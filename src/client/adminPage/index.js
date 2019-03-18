import Vue from 'vue'
import AdminApp from './admin-app'
import router from './router/index.js'
import vueResource from 'vue-resource'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(vueResource)

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

