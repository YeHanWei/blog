<template>
  <div class="row">
    <div class="col-md-offset-1 col-md-10">
      <!-- 文章 -->
      <article>
        <!-- 文章标题 -->
        <header class="center"><h1>{{article.article_title}}</h1></header>
        <!-- 文章详细信息：时间、阅读量、标签 -->
        <section class="center">
          <div class="details">
            <time class="glyphicon glyphicon-time"> {{article.article_time}} </time>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span class="glyphicon glyphicon-eye-open"> {{article.article_views}} </span>
          </div>
          <div class="details">
            <span v-for="tag in article.tags">&nbsp;<span  class="label label-primary">{{tag.tag_name}}</span></span>
          </div>
        </section>
        <!-- 文章摘要 -->
        <section class="content">
          <span style="font-weight: bold">摘要：</span><span>{{article.article_summary}}</span>
        </section>
        <!-- 文章正文 -->
        <article class="content" v-html="article.article_html"></article>
      </article>
      <hr/>
      <!-- 评论 -->
      <section>
        <!-- 发表评论 -->
        <section>
          <h3>评论</h3>
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-12">
                <textarea class="form-control" rows="6" placeholder="说点什么" v-model="commentContent"></textarea>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <input class="form-control" type="text" placeholder="昵称" v-model="commentUserName"/>
              </div>
              <div class="col-md-6">
                <input class="form-control" type="text" placeholder="邮箱" v-model="commentEmail"/>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-10 col-md-2">
                <button type="button" class="btn btn-success btn-block" @click="publicComment">发表评论</button>
              </div>
            </div>
          </form>
        </section>
        <!-- 评论列表 -->
        <article>
          <blog-comment-list-item
                  v-for="comment in comments"
                  v-bind:message="comment"
                  v-bind:key="comment.comment_id"
          ></blog-comment-list-item>
        </article>
      </section>
    </div>
  </div>
</template>

<script>
  import blogCommentListItem from '../components/blog-comment-list-item'
  export default {
    name: 'articleDetail',
    components: {blogCommentListItem},
    data() {
      return {
        article: {},
        comments: [],
        commentUserName: '',
        commentEmail: '',
        commentContent: '',
        isPublicErr: ''
      }
    },
    methods: {
      publicComment() {
        if (this.commentUserName === '') {
          this.isPublicErr = '昵称不能为空！'
        } else if (this.commentEmail === '') {
          this.isPublicErr = '邮箱不能为空！'
        } else if (this.commentContent === '') {
          this.isPublicErr = '评论内容不能为空！'
        } else {
          this.isPublicErr = ''
          this.$http.post('/blogData/publicComment', {
            article_id: this.article.article_id,
            comment_username: this.commentUserName,
            comment_email: this.commentEmail,
            comment_content: this.commentContent
          }).then(res => {
            if (res.body.iserr === true) {
              this.isPublicErr = '评论发表失败'
            } else {
              this.commentContent = ''
              this.commentEmail = ''
              this.commentUserName = ''
              this.isPublicErr = ''
              this.$http.post('/data/commentsList', {article_id: this.article.article_id}).then(res => {
                if (res.body.getListErr === false) {
                  this.comments = res.body.rows.reverse()
                }
              })
            }
          }, res => {
            this.isPublicErr = '评论发表失败'
          })
        }
      }
    },
    created: function () {
      let str = window.location.search
      let reqObj = {}
      if (str.indexOf('?') !== -1) {
        let reqStr = str.substr(1)
        let reqs = reqStr.split('&')
        for (let i = 0; i < reqs.length; i++) {
          reqObj[reqs[i].split('=')[0]] = reqs[i].split('=')[1]
        }
        this.$http.post('/blogData/articleDetail', reqObj).then(res => {
          this.article = res.body.article
          this.comments = this.article.comments.reverse()
        })
      }
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
  }
  .details {
    font-size: 18px;
    margin: 10px;
  }
  .content{
    color: black;
    font-size: 16px;
    padding: 10px;
    line-height: 200%;
  }
  hr{
    border-top: 2px solid black;
  }
  textarea{
    font-size: 18px;
  }
</style>
