<template>
  <div>
    <blog-tag-list-item
            v-for="tagArticle in tagArticles"
            v-bind:message="tagArticle"
    ></blog-tag-list-item>
  </div>
</template>

<script>
  import BlogTagListItem from '../components/blog-tag-list-item'

  export default {
    name: 'tags',
    components: {BlogTagListItem},
    data() {
      return {
        tagArticles: []
      }
    },
    created: function () {
      this.$http.get('/blogData/tagArticles').then(res => {
        this.tagArticles = res.body
      })
    }
  }
</script>

<style scoped>

</style>
