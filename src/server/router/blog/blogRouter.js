// 博客页面，页面请求路由

import express from 'express'

const blogRouter = express.Router();

/* GET home page. */
blogRouter.get('/', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/home', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/archive', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/tags', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/aboutMe', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});
blogRouter.get('/article', function(req, res, next) {
  res.render('blog-index', { title: 'fineCook' })
});

export default blogRouter
