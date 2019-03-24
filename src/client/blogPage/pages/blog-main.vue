<template>
  <div class="content">
    <blog-header></blog-header>
    <div style="padding-top: 76px; flex: 1;" class="container">
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
    components: {BlogHeader, ToTop, BlogFooter, FollowMouse}
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
