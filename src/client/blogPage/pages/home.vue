<template>
  <section>
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
      articleList: []
    }
  },
  components: {BlogArticleListItem},
  created: function() {
    // 获取文章列表
    this.$http.get('/data/getArticle').then((res) => {
      this.articleList = res.body.rows
    }, (res) => {
      console.log('error')
    })
  }
}
</script>

<style scoped>

</style>
