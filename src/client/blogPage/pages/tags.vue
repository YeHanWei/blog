<template>
  <div>
    <blog-tag-list-item
            v-for="tag in tags"
            v-bind:message="tag"
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
        // tagArticles: []
        tags: []
      }
    },
    created: function () {
      // this.$http.get('/blogData/tagArticles').then(res => {
      //   this.tagArticles = res.body
      // })
      this.$http.get('/blogData/getTags').then(res => {
        this.tags = res.body.rows
        console.log(this.tags)
      })
    }
  }
</script>

<style scoped>

</style>
