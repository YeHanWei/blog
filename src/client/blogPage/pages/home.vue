<template>
  <section>
    <div>{{this.title}}</div>
    <!--将文章列表信息传递到子组件-->
    <blog-article-list-item
            v-for="articleMessage in articleList"
            v-bind:message="articleMessage">
    </blog-article-list-item>
  </section>
</template>

<script>

import BlogArticleListItem from '../components/blog-article-list-item'

export default {
  name: 'home',
  data() {
    return {
      title: '',
      articleList: []
    }
  },
  components: {BlogArticleListItem},
  created: function() {
    // 获取文章列表
    if (this.$store.state.articles.length === 0) {
      // 文章列表为空时，请求文章列表数据
      this.$http.get('/data/getArticle').then((res) => {
        this.$store.commit('articles', res.body.rows)
        this.articleList = this.$store.state.articles
      })
    }
    this.articleList = this.$store.state.articles
    this.title = '全部文章'
  }
}
</script>

<style scoped>
section{
  max-width: 1000px;
}
div{
  color: rgba(30, 30, 30, 0.7);
  background: white;
  padding: 10px 0 10px 20px;
  margin-bottom: 5px;
}
</style>
