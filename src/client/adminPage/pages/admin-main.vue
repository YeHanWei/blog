<template>
  <div style="height: inherit">
    <admin-menu></admin-menu>
    <div class="content-box">
      <div style="flex: 1;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminMenu from '../components/admin-menu'
  export default {
    name: 'admin-main',
    components: {AdminMenu},
    data() {
      return {}
    },
    created: function() {
      if (!this.getCookie('session')) {
        this.$router.push('/login')
      } else {
        this.$router.push(window.location.pathname)
      }
    }
  }
</script>

<style scoped>

</style>
