<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3>评论列表</h3>
    </div>
    <div class="panel-body">
      <p v-show="this.$store.state.comment.getListErr">*数据获取失败，请刷新重试！</p>
      <table class="table" v-show="!this.$store.state.comment.getListErr">
        <thead>
        <tr class="table-header">
          <th style="width: 60%">评论内容</th>
          <th style="width: 25%">作者</th>
          <th style="width: 15%">创建时间</th>
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
  </div>
</template>

<script>
  import AdminCommentListItem from '../components/admin-comment-list-item'
  export default {
    name: 'comments',
    components: {AdminCommentListItem},
    created: function () {
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
    }
  }
</script>

<style scoped>
p{
  color: red;
  text-align: center;
  font-size: 10px;
}
</style>
