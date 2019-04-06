import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.config'

import blogRouter from './router/blog/blogRouter'
import adminRouter from './router/admin/adminRouter'
import data from './router/admin/data'
import blogData from './router/blog/blogData'

var compression = require('compression');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // 模版引擎 jade

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // 页面标题前的图标
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression())

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler));

//路由
app.use('/', blogRouter);
app.use('/admin', adminRouter);
app.use('/data', data);
app.use('/blogData', blogData)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err)
});

// error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: err
  // })
  res.render('error')
});

app.listen(3000);

export default app
