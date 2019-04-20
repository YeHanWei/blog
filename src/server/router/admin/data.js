import express from 'express'
import op from '../../modules/db/index'


const dataRouter = express.Router();

// 博客数据库初始化
dataRouter.post('/init', (req, res, next) => {
  (async function(){
    op.blogInit().then(() => {
      op.userInit(req.body).then(iserr => {
        res.send({iserr: iserr});
      }).catch((iserr) => {
        res.send({iserr: iserr});
      });
    }).catch(() => {
      res.send({iserr: true});
    });
  })();
});

// 管理员登陆验证
dataRouter.post('/login', (req, res) => {
  op.getAccountPwd().then(obj => {
    if(req.body.account === obj.result.account && req.body.password === obj.result.password){
      res.send({iserr: false});
    } else {
      res.send({iserr: true});
    }
  }).catch(iserr => {
    res.send({iserr: iserr});
  });
});

// 修改密码
dataRouter.post('/updatePwd', (req, res) => {
  op.getAccountPwd().then(obj => {
    // 比对原密码
    if(req.body.old_password !== obj.result.password) {
      res.send({iserr: "原密码错误"})
    } else {
      // 更改密码
      op.updatePwd(req.body.new_password).then(obj => {
        res.send({iserr: false})
      }).catch(obj => {
        res.send({iserr: '密码更改失败'})
      })
    }
  }).catch(obj => {
    res.send({iserr: '密码更改失败'})
  })
})

// 获取博客配置信息
dataRouter.get('/getBlogConfig', (req, res) => {
  op.getBlogConfig().then(result => {
    res.send({row: result})
  })
})

// 更改博客配置信息
dataRouter.post('/updateBlogConfig', (req, res) => {
  op.updateBlogConfig(req.body).then(() => {
    res.send({iserr: false})
  }).catch(() => {
    res.send({iserr: true})
  })
})

// 修改邮箱
dataRouter.post('/updateEmail', (req, res) => {
  op.updateEmail(req.body).then(obj => {
    res.send({iserr: false})
  }).catch((obj) => {
    res.send({iserr: true})
  })
})

// 获取文章列表
dataRouter.all('/getArticle', (req, res) => {
    if(req.body.article_id) {
      op.getArticle(req.body.article_id).then(obj => {
        res.send(obj)
      }).catch((iserr) => {
        res.send({iserr: iserr})
      })
    }else {
      op.getArticle().then(obj => {
        res.send(obj)
      }).catch((iserr) => {
        res.send({iserr: iserr})
      })
    }
});

// 删除文章
dataRouter.post('/deleteArticle', (req, res) => {
    op.deleteArticle(req.body.article_id).then(iserr => {
      res.send({deleteErr: iserr})
    }).catch(iserr => {
      res.send({deleteErr: iserr})
    })
});

// 发布新文章
dataRouter.post('/public', (req, res, next) => {
  op.publicArticle(req.body).then((iserr) => {
    res.send({isPublicErr: iserr});
  }).catch((iserr) => {
    res.send({isPublicErr: iserr});
  })
});

// 新建标签
dataRouter.post('/addTag', (req, res, next) => {
  op.addTag(req.body).then((iserr) => {
    res.send({iserr: iserr})
  }).catch(iserr => {
    res.send({iserr: iserr})
  });
});

// 获取标签列表
dataRouter.get('/tagsList', function(req, res, next) {
  op.getTags().then(obj => {
    res.send(obj.result)
  }).catch(obj => {
    res.send({iserr: obj.iserr})
  })
});

// 删除标签
dataRouter.post('/deleteTag', (req, res) => {
 op.deleteTag(req.body.tag_id).then(iserr => {
      res.send({deleteErr: iserr});
    }).catch(iserr => {
      res.send({deleteErr: iserr});
    })
});

// 修改标签
dataRouter.post('/updateTag', (req, res) => {
  op.updateTag(req.body).then(iserr => {
    res.send({updateErr: iserr});
  }).catch(iserr => {
    res.send({updateErr: iserr})
  })
});

// 新建友链
dataRouter.post('/addFriendlyLink', function(req, res, next) {
  op.addFriendlyLink(req.body).then(iserr => {
    res.send({iserr: iserr})
  }).catch(iserr => {
    res.send({iserr: iserr})
  })
});

// 获取友链列表
dataRouter.get('/friendlyLinkList', (req, res) => {
  op.getFriendlyLinks().then((obj) => {
    res.send({getListErr: obj.iserr, rows: obj.result})
  }).catch(obj => {
    res.send({getListErr: obj.iserr})
  })
});

// 删除友链
dataRouter.post('/deleteFriendlyLink', (req, res) => {
  op.deleteFriendlyLink(req.body.link_id).then(iserr => {
    res.send({deleteErr: iserr});
  }).catch(iserr => {
    res.send({deleteErr: iserr});
  })
});

// 修改友链
dataRouter.post('/updateFriendlyLink', (req, res) => {
  op.updateFriendlyLink(req.body).then(iserr => {
    res.send({updateErr: iserr});
  }).catch(iserr => {
    res.send({updateErr: iserr})
  })
});

// 获取评论列表
dataRouter.all('/commentsList', (req, res, ) => {
  if(req.body.article_id){
    op.getComments(req.body.article_id).then(obj => {
      res.send({getListErr: obj.iserr, rows: obj.rows})
    }).catch(iserr => {
      res.send({getListErr: iserr})
    })
  } else {
    op.getComments().then(obj => {
      res.send({getListErr: obj.iserr, rows: obj.rows})
    }).catch(iserr => {
      res.send({getListErr: iserr})
    })
  }
});

// 删除评论
dataRouter.post('/deleteComment', function(req, res, next) {
  op.deleteComment(req.body.comment_id).then(iserr => {
    res.send({deleteErr: iserr})
  }).catch(iserr => {
    res.send({deleteErr: iserr})
  })
});

// 更新关于我内容
dataRouter.post('/updateAboutMe', (req, res) => {
  op.updateAboutMe(req.body.about_me_md, req.body.about_me_html).then(iserr => {
      res.send({updateErr: iserr})
    }).catch(iserr => {
      res.send({updateErr: iserr})
    })
});

// 获取关于我内容
dataRouter.get('/getAboutMeMd', (req, res) => {
  op.getAboutMe('md').then(obj => {
    res.send({about_me_md: obj.about_me})
  }).catch(obj => {
    res.send({iserr: obj.iserr})
  })
})

// 保存文章草稿
dataRouter.post('/saveDraft', (req, res, next) => {
  op.saveDraft(req.body).then(iserr => {
    res.send({issaveErr: iserr});
  }).catch(iserr => {
    res.send({issaveErr: iserr});
  });
});

// 获取草稿列表
dataRouter.get('/draftList', function (req, res, next) {
  op.getDraftList().then(rows => {
    res.send({rows: rows})
  });
});

// 根据草稿id过去草稿
dataRouter.post('/getDraft', (req, res) => {
  op.getDraft(req.body.draft_id).then(rows => {
    res.send({rows: rows});
  })
});

// 删除草稿
dataRouter.post('/deleteDraft', (req, res) => {
  op.deleteDraft(req.body.draft_id).then(iserr => {
    res.send({deleteErr: iserr})
  })
});

export default dataRouter
