<template>
  <div id="article-list">
    <!-- 文章列表 -->
    <table>
      <thead class="table-header">
      <tr>
        <th style="width: 60%">标题</th>
        <th style="width: 10%">评论</th>
        <th style="width: 10%">浏览</th>
        <th style="width: 20%">创建日期</th>
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
      this.$store.commit('pageState/articleListActive', true)
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
    },
    destroyed: function () {
      this.$store.commit('pageState/articleListActive', false)
    }
  }
</script>

<style scoped>
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
th:nth-child(n+2) {
  text-align: center;
}
</style>
