<template>
  <ul>
    <li v-for="article in articleList">
      {{article.article_time}} >>>
      <router-link :to="'/article?article_id=' + article.article_id.toString()" target="_self">{{article.article_title}}</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'archive',
    data() {
      return {
        articleList: []
      }
    },
    created: function () {
      this.$http.get('/blogData/getArchive').then(res => {
        this.articleList = res.body
      })
    }
  }
</script>

<style scoped>
li {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
