import Vue from 'vue'
import VueX from 'vuex'
import article from './modules/article/index'
import tag from './modules/tag/index'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    article: article,
    tag: tag
  }
})
