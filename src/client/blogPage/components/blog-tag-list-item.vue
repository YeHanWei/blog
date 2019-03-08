<template>
  <div class="panel panel-default">
    <div class="panel-heading"><p class="title">{{tagName}}</p></div>
    <div class="panel-body">
      <ul class="list-group">
        <router-link v-for="article in articleList" :to="'/article?article_id=' + article.article_id.toString()" target="_self">
          <li class="list-group-item">{{article.article_title}}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'blog-tag-list-item',
    props: ['message'],
    data() {
      return {
        tagName: this.message.tag_name,
        articleList: this.message.articles
      }
    }
  }
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
</style>
