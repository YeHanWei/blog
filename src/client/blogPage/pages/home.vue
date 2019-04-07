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
    if (window.location.pathname === '/home' || window.location.pathname === '/') {
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
    // 根据标签获取文章列表
    if (window.location.pathname === '/tagDetail') {
      let str = window.location.search
      let reqObj = {}
      if (str.indexOf('?') !== -1) {  // 存在参数
        let reqStr = str.substr(1)
        let reqs = reqStr.split('&')  // 切割参数
        for (let i = 0; i < reqs.length; i++) {
          reqObj[reqs[i].split('=')[0]] = reqs[i].split('=')[1]
        }
        let isExist = false
        for (let i in this.$store.state.tagArticles) {
          if (this.$store.state.tagArticles[i].tag.tag_id === reqObj.tag_id) {
            isExist = true
            this.articleList = this.$store.state.tagArticles[i].articles
            this.title = '标签 > ' + this.$store.state.tagArticles[i].tag.tag_name
            break
          }
        }
        if (!isExist) {
          this.$http.post('/blogData/getTagDetail', reqObj).then((res) => {
            this.$store.commit('tagArticles', res.body.rows)
            this.articleList = res.body.rows.articles
            this.title = '标签 > ' + res.body.rows.tag.tag_name
          })
        }
      }
    }
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
