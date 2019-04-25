/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import BlogMain from '../pages/blog-main'
import home from '../pages/home'
import tags from '../pages/tags'
import tagDetail from '../pages/tagDetail'
import aboutMe from '../pages/about-me'
import Archive from '../pages/archive'
import article from '../pages/articleDetail'
import search from '../pages/search'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          path: 'tagDetail',
          component: tagDetail
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
        },
        {
          path: 'search',
          component: search
        }
      ]
    }
  ]
})
