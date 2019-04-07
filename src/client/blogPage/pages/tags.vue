<template>
  <div>
    <blog-tag-list-item
            v-for="tag in this.$store.state.tags"
            v-bind:message="tag"
    ></blog-tag-list-item>
  </div>
</template>

<script>
  import BlogTagListItem from '../components/blog-tag-list-item'

  export default {
    name: 'tags',
    components: {BlogTagListItem},
    created: function () {
      if (this.$store.state.tags.length === 0) {
        this.$http.get('/blogData/getTags').then(res => {
          this.$store.commit('tags', res.body.rows)
        })
      }
    }
  }
</script>

<style scoped>

</style>
