// 博客页面，页面请求路由

import express from 'express'
// import adminRouter from "../admin/adminRouter";

const blogRouter = express.Router();
/* 登陆 */
blogRouter.get('/login', function(req, res, next) {
  res.render('admin-index');
});
/* 找回密码 */
blogRouter.get('/finePwd', function(req, res, next) {
  res.render('admin-index');
});
/* 初始化 */
blogRouter.get('/init', function(req, res, next) {
  res.render('admin-index');
});
/* GET home page. */
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
