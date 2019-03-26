<template>
  <tr class="item-font">
    <td>
      <a class="item-name" :href="'/article?article_id=' + articleId.toString()" target="_blank">{{articleTitle}}</a>
      <br/>
      <button class="btn btn-default control-btn" @click="update">更新</button>
      <button class="btn btn-default control-btn" data-toggle="modal" :data-target="$data._deleteModalID">删除</button>
      <!-- delete modal-->
      <div class="modal fade" :id="deleteModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="deleteModelLabel">删除文章</h4>
            </div>
            <div class="modal-body">
              确认删除文章《{{articleTitle}}》?
            </div>
            <div class="modal-footer">
              <p v-show="deleteErr">删除失败！</p>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-default" @click="deleteArticle">确认</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-default control-btn" data-toggle="modal" :data-target="$data._commentModalID" @click="getComments">评论</button>
      <!-- comment list modal -->
      <div class="modal fade" :id="commentModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="commentModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="commentModelLabel">评论</h4>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                <tr class="table-header">
                  <th style="width: 60%">评论内容</th>
                  <th style="width: 25%">作者</th>
                  <th style="width: 15%">创建时间</th>
                </tr>
                </thead>
                <tbody>
                <admin-comment-list-item
                        v-for="commentMessage in commentsList"
                        v-bind:message="commentMessage"
                ></admin-comment-list-item>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>{{commentNum}}</td>
    <td>{{views}}</td>
    <td>{{publicDate}}</td>
  </tr>
</template>

<script>
  import AdminCommentListItem from './admin-comment-list-item'
  export default {
    name: 'admin-article-list-item',
    components: {AdminCommentListItem},
    props: ['message'],
    data() {
      return {
        commentsList: [],
        getListErr: false,
        articleId: this.message.article_id,
        articleTitle: this.message.article_title,
        views: this.message.article_views,
        commentNum: this.message.comments,
        publicDate: this.message.article_time,
        deleteErr: false,
        _deleteModalID: '#' + 'delete' + this.message.article_id.toString(),
        deleteModalID: 'delete' + this.message.article_id.toString(),
        deleteModelLabel: 'delete' + this.message.article_id.toString() + 'Label',
        _commentModalID: '#' + 'comment' + this.message.article_id.toString(),
        commentModalID: 'comment' + this.message.article_id.toString(),
        commentModelLabel: 'comment' + this.message.article_id.toString() + 'Label'
      }
    },
    methods: {
      deleteArticle() {
        this.$http.post('/data/deleteArticle', {article_id: this.articleId}).then(res => {
          this.deleteErr = res.body.deleteErr
          if (this.deleteErr === false) {
            window.location = '/admin/articleList'  // 刷新页面
          }
        }, res => {
          this.deleteErr = true
        })
      },
      update() {
        this.$http.post('/data/getArticle', {article_id: this.articleId}).then(res => {
          this.$store.commit('article/article_id', res.body.rows.article_id)
          this.$store.commit('article/article_title', res.body.rows.article_title)
          this.$store.commit('article/article_md', res.body.rows.article_md)
          this.$store.commit('article/article_html', res.body.rows.article_html)
          this.$store.commit('article/article_summary', res.body.rows.article_summary)
          this.$store.commit('article/article_tag', res.body.rows.article_tags.join(';'))
          this.$store.commit('article/isUpdate', true)
          this.$router.push('/admin/newArticle')
        })
      },
      // 评论按钮点击事件，加载评论
      getComments() {
        this.$http.post('/data/commentsList', {article_id: this.articleId}).then(res => {
          this.getListErr = res.body.getListErr
          if (this.getListErr === false) {
            this.commentsList = res.body.rows
          }
        }, res => {
          this.getListErr = true
        })
      }
    }
  }
</script>

<style scoped>
  a:hover{
    text-decoration: none;
    cursor: pointer;
  }
  tr{
    transition: background 0.7s;
    -webkit-transition: background 0.5s;
  }
  tr:hover{
    background-color: rgba(200, 200, 200, 0.6);
  }
</style>
