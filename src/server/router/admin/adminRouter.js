import express from 'express'

const adminRouter = express.Router();

/* GET home page. */
adminRouter.get('/', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/articleList', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/friendlyLink', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/tags', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/comments', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/NewArticle', function(req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/aboutMe', function (req, res, next) {
  res.render('admin-index');
});
adminRouter.get('/draftBox', function (req, res, next) {
  res.render('admin-index');
});
export default adminRouter
