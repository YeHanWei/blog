<template>
  <div class="content">
    <blog-header></blog-header>
    <div style="padding-top: 76px; flex: 1; max-width: 1000px" class="container">
      <router-view/>
    </div>
    <follow-mouse></follow-mouse>
    <blog-footer></blog-footer>
    <to-top></to-top>
  </div>
</template>

<script>
  import BlogHeader from '../components/blog-header'
  import ToTop from '../components/to-top'
  import BlogFooter from '../components/blog-footer'
  import FollowMouse from '../components/follow-mouse'
  export default {
    name: 'blog-main',
    components: {BlogHeader, ToTop, BlogFooter, FollowMouse},

    created() {
      this.$http.get('/data/getBlogConfig').then(res => {
        this.$store.commit('blogConfig', res.body.row)
      })
    }
  }
</script>

<style scoped>
.content{
  height: inherit;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
