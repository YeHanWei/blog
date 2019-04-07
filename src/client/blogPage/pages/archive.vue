<template>
  <ul>
    <li v-for="article in this.$store.state.archive">
      <span>{{article.article_time}}</span><span> &bull; </span>
      <router-link :to="'/article?article_id=' + article.article_id.toString()" target="_self">{{article.article_title}}</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'archive',
    created: function () {
      if (this.$store.state.archive.length === 0) {
        this.$http.get('/blogData/getArchive').then(res => {
          res.body.sort(function (id1, id2) {
            return id2.article_id - id1.article_id
          })
          this.$store.commit('archive', res.body)
        })
      }
    }
  }
</script>

<style scoped>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  font-size: 20px;
  margin-bottom: 1px;
  background: white;
  padding: 8px 0 8px 10px;
  box-sizing: border-box;
  border-left: 10px solid rgba(20, 20, 200, 0.4);
}
span{
  color: rgba(25, 25, 25, 0.7);
}
a{
  text-decoration: none;
  color: rgba(30, 30, 60, 0.6);
}
</style>
