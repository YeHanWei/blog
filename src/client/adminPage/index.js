import Vue from 'vue'
import AdminApp from './admin-app'
import router from './router/index.js'
import vueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(vueResource)
Vue.use(Vuex)

// VueX 状态管理
const store = new Vuex.Store({
  state: {
    article_id: '',
    article_title: '',
    article_md: '',
    article_html: '',
    article_summary: '',
    article_tag: '',
    isUpdate: false,
    isSave: false
  },
  mutations: {
    clearStates (state) {
      state.article_id = ''
      state.article_title = ''
      state.article_md = ''
      state.article_html = ''
      state.article_summary = ''
      state.article_tag = ''
      state.isUpdate = false
      state.isSave = false
    },
    article_id(state, articleId) {
      state.article_id = articleId
    },
    article_title(state, articleTitle) {
      state.article_title = articleTitle
    },
    article_md(state, articleMd) {
      state.article_md = articleMd
    },
    article_html(state, articleHtml) {
      state.article_html = articleHtml
    },
    article_summary(state, articleSummary) {
      state.article_summary = articleSummary
    },
    article_tag(state, articleTag) {
      state.article_tag = articleTag
    },
    isUpdate(state, isUpdate) {
      state.isUpdate = isUpdate
    },
    isSave(state, isSave) {
      state.isSave = isSave
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#admin-app',
  router,
  store,
  components: { AdminApp },
  render (createElement) {
    return createElement(AdminApp)
  }
})

