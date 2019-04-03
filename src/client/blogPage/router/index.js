/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import BlogMain from '../pages/blog-main'
import home from '../pages/home'
import tags from '../pages/tags'
import aboutMe from '../pages/about-me'
import Archive from '../pages/archive'
import article from '../pages/articleDetail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: BlogMain,
      children: [
        {
          path: '',
          component: home
        },
        {
          path: 'home',
          component: home
        },
        {
          path: 'tags',
          component: tags
        },
        {
          path: 'aboutMe',
          component: aboutMe
        },
        {
          path: 'archive',
          component: Archive
        },
        {
          path: 'article',
          component: article
        }
      ]
    }
  ]
})
