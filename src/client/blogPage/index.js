import Vue from 'vue'
import BlogApp from './blog-app'
import router from './router/index.js'
import vueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(vueResource)

/* eslint-disable no-new */
new Vue({
  el: '#blog-app',
  router,
  components: { BlogApp },
  render (createElement) {
    return createElement(BlogApp)
  }
})
