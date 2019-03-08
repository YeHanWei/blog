<template>
  <div class="content">
    <blog-header></blog-header>
    <div style="padding-top: 76px; flex: 1;" class="container">
      <router-view/>
    </div>
    <blog-footer></blog-footer>
    <to-top></to-top>
  </div>
</template>

<script>
  import BlogHeader from '../components/blog-header'
  import ToTop from '../components/to-top'
  import BlogFooter from '../components/blog-footer'
  export default {
    name: 'blog-main',
    components: {BlogHeader, ToTop, BlogFooter}
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
