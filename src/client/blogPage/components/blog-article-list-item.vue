<template>
  <div class="well">
    <header>
      <h3><router-link :to="link" target="_self">{{articleTitle}}</router-link></h3>
    </header>
    <section>{{abstract}}</section>
    <footer>
      <span>{{publicDate}} &#8226; </span>
      <span>浏览量 {{views}}</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'blog-article-list-item',
  props: ['message'],
  data() {
    return {
      articleId: this.message.article_id,
      articleTitle: this.message.article_title,
      abstract: this.message.article_summary,
      views: this.message.article_views,
      publicDate: this.message.article_time,
      link: '/article?article_id=' + this.message.article_id.toString()
    }
  }
}

</script>

<style scoped>
footer{
  height: 25px;
  padding: 5px 10px;
}
</style>
