<template>
  <tr class="item-font">
    <td>
      <span class="item-name">{{commentContent}}</span><br/>
      <span>on&nbsp;</span><a class="item-name" :href="'/article?article_id=' + articleId.toString()" target="_blank">{{articleTitle}}</a>
    </td>
    <td>
      <span class="item-name">{{commentAuthor}}</span><br/>
      <span>{{commentEmail}}</span>
    </td>
    <td>
      {{createTime}}
      <br/>
      <button class="control-btn"  data-toggle="modal" :data-target="$data._deleteModalID">移除</button>
      <!-- delete modal -->
      <div class="modal fade" :id="deleteModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="deleteModelLabel">删除评论</h4>
            </div>
            <div class="modal-body">
              确认删除“{{commentAuthor}}”的评论?
            </div>
            <div class="modal-footer">
              <p v-show="deleteErr">删除失败！</p>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-default" @click="deleteComment">确认</button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'admin-comment-list-item',
    props: ['message'],
    data() {
      return {
        articleId: this.message.article_id,
        commentID: this.message.comment_id,
        commentContent: this.message.comment_content,
        articleTitle: this.message.article_title,
        commentAuthor: this.message.comment_username,
        commentEmail: this.message.email,
        createTime: this.message.comment_time,
        deleteErr: false,
        _deleteModalID: '#' + 'delete' + this.message.comment_id.toString(),
        deleteModalID: 'delete' + this.message.comment_id.toString(),
        deleteModelLabel: 'delete' + this.message.comment_id.toString() + 'Label'
      }
    },
    methods: {
      deleteComment() {
        this.$http.post('/data/deleteComment', {comment_id: this.commentID}).then(res => {
          this.deleteErr = res.body.deleteErr
          if (this.deleteErr === false) {
            // 刷新评论列表
            this.$http.get('/data/commentsList').then((res) => {
              this.$store.commit('comment/getListErr', res.body.getListErr)
              if (this.$store.state.comment.getListErr === false) {
                this.$store.commit('comment/commentsList', res.body.rows)
              }
            },
              (res) => {
                this.$store.commit('comment/getListErr', true)
              })
          }
        }, res => {
          this.deleteErr = true
        })
      }
    }
  }
</script>

<style scoped>
tr{
  transition: background 0.7s;
  -webkit-transition: background 0.5s;
}
tr:hover{
  background-color: rgba(200, 200, 200, 0.6);
}
a:hover{
  text-decoration: none;
  cursor: pointer;
}
td:nth-child(1){
  padding: 5px 0 5px 10px;
}
</style>
