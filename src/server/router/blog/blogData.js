// 博客页面数据请求路由
import express from 'express'
import email from '../../modules/email/index'
import op from '../../modules/db/index'
import adminRouter from "../admin/adminRouter";
import dataRouter from "../admin/data";

const blogData = express.Router();

export default blogData

// 获取友链相关数据
blogData.get('/getFriendlyLinks', (req, res) => {
  op.getFriendlyLinks().then(obj => {
    let links = [];
    for(let index = 0;index < obj.result.length; index++){
      links.push({link_url: obj.result[index].link_url,link_name: obj.result[index].link_name})
    }
    res.send(links)
  })
});

// 获取标签及其文章
blogData.get('/TagArticles', (req, res) => {
  op.getTagArticles().then((tagArticles) => {
    res.send(tagArticles);
  })
});

// 获取标签
blogData.get('/getTags', (req, res) => {
  op.getTags().then((obj) => {
    res.send({rows: obj.result})
  })
})

// 根据标签id获取对应标签的文章列表
blogData.post('/getTagDetail', (req, res) => {
  console.log(req.body)
  op.getTagDetail(req.body.tag_id).then(result => {
    res.send({rows: result})
  })
})

// 获取关于我，HTML格式
blogData.get('/getAboutMeHtml', (req, res) => {
  op.getAboutMe('html').then(obj => {
    res.send({about_me_html: obj.about_me})
  }).catch(iserr => {
    res.send({iserr: iserr})
  })
});

// 获取归档
blogData.get('/getArchive', (req, res) => {
  op.getArchive().then(rows => {
    res.send(rows);
  })
});

// 获取文章详细信息，包括文章、标签、评论
blogData.post('/articleDetail', (req, res) => {
  op.getArticleDetail(req.body.article_id).then(article => {
    res.send({article: article})
  })
});

// 发表评论
blogData.post('/publicComment', (req, res) => {
  console.log(req.body)
  op.publicComment(req.body).then(iserr => {
    res.send({iserr: iserr})
  }).catch(iserr => {
    res.send({iserr: iserr})
  })
});

// 搜索
blogData.post('/search', (req, res)=> {
  op.search(req.body.search_text).then((obj) => {
    res.send({results: obj.results})
  }).catch(() => {
    res.send({iserr: true})
  })
})
