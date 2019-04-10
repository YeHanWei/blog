<template>
<div>
  <!-- 选择菜单 -->
  <ul>
    <li :class="{active: isUser}" @click="toUser">用户管理</li>
    <li :class="{active: isConfig}" @click="toConfig">博客配置</li>
  </ul>
  <!-- 用户管理 -->
  <admin-config-user-manage v-show="isUser"></admin-config-user-manage>
  <!-- 博客配置 -->
  <admin-config-blog-config v-show="isConfig"></admin-config-blog-config>
</div>
</template>

<script>
  import AdminConfigBlogConfig from '../components/admin-config-blog-config'
  import AdminConfigUserManage from '../components/admin-config-user-manage'
  export default {
    name: 'config',
    components: {AdminConfigBlogConfig, AdminConfigUserManage},
    data() {
      return {
        isUser: true,
        isConfig: false
      }
    },
    methods: {
      toUser() {
        this.isConfig = false
        this.isUser = true
      },
      toConfig() {
        this.isUser = false
        this.isConfig = true
      }
    },
    created: function () {
      this.$store.commit('pageState/configActive', true)
    },
    destroyed: function () {
      this.$store.commit('pageState/configActive', false)
    }
  }
</script>

<style scoped>
.active{
  background: white;
  color: rgb(20, 100, 200);
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
  background: #CCC;
  font-size: 0;
}
li{
  display: inline-block;
  font-size: 16px;
  color: rgba(20, 20, 20, 0.7);
  padding: 25px 15px 25px 15px;
  cursor: pointer;
}
li:hover{
  background: white;
  color: rgb(20, 100, 200);
}
</style>
