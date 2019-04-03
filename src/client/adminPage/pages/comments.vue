<template>
  <div class="panel panel-default">
    <p v-show="this.$store.state.comment.getListErr">*数据获取失败，请刷新重试！</p>
    <table class="table" v-show="!this.$store.state.comment.getListErr">
      <thead>
      <tr class="table-header">
        <th style="width: 55%">评论内容</th>
        <th style="width: 25%">作者</th>
        <th style="width: 20%">创建时间</th>
      </tr>
      </thead>
      <tbody>
      <admin-comment-list-item
              v-for="commentMessage in this.$store.state.comment.commentsList"
              v-bind:message="commentMessage"
      ></admin-comment-list-item>
      </tbody>
    </table>
  </div>
</template>

<script>
  import AdminCommentListItem from '../components/admin-comment-list-item'
  export default {
    name: 'comments',
    components: {AdminCommentListItem},
    created: function () {
      this.$store.commit('pageState/commentsActive', true)
      if (this.$store.state.comment.commentsList.length === 0) {
        this.$http.get('/data/commentsList').then((res) => {
          this.$store.commit('comment/getListErr', res.body.getListErr) // 更新错误状态
          if (this.$store.state.comment.getListErr === false) {
            // 更新评论列表
            this.$store.commit('comment/commentsList', res.body.rows)
          }
        },
          (res) => {
            this.$store.commit('comment/getListErr', true)
          })
      }
    },
    destroyed: function () {
      this.$store.commit('pageState/commentsActive', false)
    }
  }
</script>

<style scoped>
p{
  color: red;
  text-align: center;
  font-size: 10px;
}
table{
  width: 100%;
  background: #FAFAFA;
}
tr{
  border-bottom: 5px solid #EEEEEE;
}
th:nth-child(1){
  padding: 10px 0 10px 10px;
}
</style>
