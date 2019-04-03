<template>
  <div class="article-item">
    <header>
      <h3><router-link :to="link" target="_self">{{articleTitle}}</router-link></h3>
    </header>
    <summary>{{abstract}}</summary>
    <footer>
      <span>{{publicDate}}</span>
      <span>|</span>
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
.article-item{
  margin: 0 0 5px 0;
  padding: 10px 20px 10px 20px;
  background: white;
  border: 1px;
  max-width: 1000px;
}
h3{
  margin: 0;
}
header{
  margin-bottom: 10px;
}
a{
  color: #555;
  font-weight: 600;
}
a:hover{
  color: #039;
  text-decoration: none;
  cursor: pointer;
}
summary{
  font-size: 16px;
  color: #888;
  padding: 3px 0 3px 0;
}
footer{
  font-size: 14px;
  color: #777;
}
</style>
