import Vue from 'vue'
import VueX from 'vuex'
import BlogApp from './blog-app'
import router from './router/index.js'
import vueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueX)
Vue.use(vueResource)

// vuex 状态管理
const store = new VueX.Store({
  state: {
    articles: [],
    tags: [],
    archive: [],
    tagArticles: [],
    aboutMe: '',
    blogConfig: {},
    searchResults: [],
    searchText: '',
    isSearchNull: false
  },
  mutations: {
    articles(state, data) {
      state.articles = data
    },
    tags(state, data) {
      state.tags = data
    },
    archive(state, data) {
      state.archive = data
    },
    tagArticles(state, data) {
      state.tagArticles.push(data)
    },
    aboutMe(state, data) {
      state.aboutMe = data
    },
    blogConfig(state, data) {
      state.blogConfig = data
    },
    searchResults(state, data) {
      state.searchResults = data
    },
    searchText(state, data) {
      state.searchText = data
    },
    isSearchNull(state, data) {
      state.isSearchNull = data
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#blog-app',
  store,
  router,
  components: { BlogApp },
  render (createElement) {
    return createElement(BlogApp)
  }
})

