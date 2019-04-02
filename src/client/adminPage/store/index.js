import Vue from 'vue'
import VueX from 'vuex'
import article from './modules/article/index'
import tag from './modules/tag/index'
import comment from './modules/comment/index'
import friendlyLink from './modules/friendlyLink/index'
import pageState from './modules/pageState/index'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    article: article,
    tag: tag,
    comment: comment,
    friendlyLink: friendlyLink,
    pageState: pageState
  }
})
