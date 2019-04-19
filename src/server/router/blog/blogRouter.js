// 博客页面，页面请求路由

import express from 'express'
import adminRouter from "../admin/adminRouter";

const blogRouter = express.Router();
/* 登陆 */
blogRouter.get('/login', function(req, res, next) {
  res.render('admin-index');
});
/* 找回密码 */
blogRouter.get('/findPwd', function(req, res, next) {
  res.render('admin-index');
});
/* 初始化 */
blogRouter.get('/init', function(req, res, next) {
  res.render('admin-index');
});
/* GET home page. */
blogRouter.get('/', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/home', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/archive', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/tags', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/aboutMe', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/article', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/tagDetail', function(req, res, next) {
  res.render('blog-index')
});
blogRouter.get('/search', function (req, res, next) {
  res.render('blog-index');
});
export default blogRouter
