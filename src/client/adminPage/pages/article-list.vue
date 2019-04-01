<template>
  <div id="article-list">
    <!-- 文章列表 -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>文章列表</h3>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
          <tr class="table-header">
            <th style="width: 70%">标题</th>
            <th>评论</th>
            <th>浏览</th>
            <th>创建日期</th>
          </tr>
          </thead>
          <tbody>
          <!-- 文章列表内容 -->
          <admin-article-list-item
            v-for="articleMessage in this.$store.state.article.articleList"
            v-bind:message="articleMessage"
          ></admin-article-list-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminArticleListItem from '../components/admin-article-list-item'

  export default {
    name: 'article-list',
    data() {
      return {
        iserr: false
      }
    },
    components: {AdminArticleListItem},
    created: function() {
      // 获取文章列表
      if (this.$store.state.article.articleList.length === 0) {
        this.$http.get('/data/getArticle').then((res) => {
          this.iserr = res.body.iserr
          this.$store.commit('article/articleList', res.body.rows)
        },
          (res) => {
            this.iserr = true
          })
      }
    }
  }
</script>

<style scoped>

</style>
