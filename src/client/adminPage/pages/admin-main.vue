<template>
  <div style="height: inherit">
    <admin-menu></admin-menu>
    <div class="content-box">
      <div style="flex: 1;">
        <router-view></router-view>
      </div>
      <!--<blog-footer></blog-footer>-->
    </div>
  </div>
</template>

<script>
  import AdminMenu from '../components/admin-menu'
  // import BlogFooter from '../../blogPage/components/blog-footer'
  export default {
    name: 'admin-main',
    components: {AdminMenu}
  }
</script>

<style scoped>

</style>
