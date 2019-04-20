/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import Init from '../pages/init'
import Login from '../pages/login'
import Main from '../pages/admin-main'
import ArticleList from '../pages/article-list'
import FriendlyLink from '../pages/friendly-link'
import Tags from '../pages/tags'
import Comments from '../pages/comments'
import NewArticle from '../pages/new-article'
import AboutMe from '../pages/about-me'
import DraftBox from '../pages/draft-box'
import Config from '../pages/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/init',
      component: Init
    },
    {
      path: '/admin',
      component: Main,
      children: [
        {
          path: '',
          component: ArticleList
        },
        {
          path: 'articleList',
          component: ArticleList
        },
        {
          path: 'friendlyLink',
          component: FriendlyLink
        },
        {
          path: 'tags',
          component: Tags
        },
        {
          path: 'comments',
          component: Comments
        },
        {
          path: 'newArticle',
          component: NewArticle
        },
        {
          path: 'aboutMe',
          component: AboutMe
        },
        {
          path: 'draftBox',
          component: DraftBox
        },
        {
          path: 'config',
          component: Config
        }
      ]
    }
  ]
})
