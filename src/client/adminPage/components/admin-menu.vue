<template>
  <div id="menu">
    <div id="title">个人博客系统 控制台</div>
    <ul class="top-level">
      <li @click="clickArticleList">
        <span class="glyphicon glyphicon-align-right"></span>
        &nbsp;文章管理
      </li>
      <ul :style="{display: display}" class="two-level">
        <router-link tag="li" to="/admin/articleList">
          <span class="glyphicon glyphicon-list-alt"></span>
          &nbsp;文章列表
        </router-link>
        <router-link tag="li" to="/admin/newArticle">
          <span class="glyphicon glyphicon-pencil"></span>
          &nbsp;新建文章
        </router-link>
        <router-link tag="li" to="/admin/draftBox">
          <span class="glyphicon glyphicon-tasks"></span>
          &nbsp;草稿箱
        </router-link>
      </ul>
      <router-link tag="li" to="/admin/comments">
        <span class="glyphicon glyphicon-comment"></span>
        &nbsp;评论管理
      </router-link>
      <router-link tag="li" to="/admin/tags">
        <span class="glyphicon glyphicon-tags"></span>
        &nbsp;标签管理
      </router-link>
      <router-link tag="li" to="/admin/friendlyLink">
        <span class="glyphicon glyphicon-link"></span>
        &nbsp;友链管理
      </router-link>
      <router-link tag="li" to="/admin/config">
        <span class="glyphicon glyphicon-wrench"></span>
        &nbsp;参数设置
      </router-link>
      <router-link tag="li" to="/admin/aboutMe">
        <span class="glyphicon glyphicon-exclamation-sign"></span>
        &nbsp;关于我
      </router-link>
      <div class="btn-container">
        <button class="btn btn-default btn-block" @click="logout">退出登陆</button>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'admin-menu',
    data() {
      return {
        display: 'block'
      }
    },
    methods: {
      // 展开、关闭文章管理选项卡列表
      clickArticleList: function() {
        if (this.display === 'block') {
          this.display = 'none'
        } else {
          this.display = 'block'
        }
      },
      logout: function() {
        this.delCookie('session', 0)
        this.$router.push('/login')
      }
    },
    mounted: function () {
      let lis = document.getElementsByTagName('li')
      for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
          for (let j = 0; j < lis.length; j++) {
            lis[j].style.background = '#111'
          }
          this.style.background = '#555'
        }
      }
    }
  }
</script>

<style scoped>
#menu{
  height: 100%;
  width: 350px;
  position: fixed;
  left: 0;
  background: #111111;
  overflow: auto;
}
#title{
  font-size: 30px;
  color: #EEEEEE;
  padding: 10px 0 10px 20px;
  font-family: "Microsoft YaHei",serif;
}
.top-level{
  padding: 5px 0 20px 0;
  font-size: 20px;
  border-bottom: 1px solid #111111;
  list-style: none;
}
.top-level li{
  color: #EEEEEE;
  padding: 15px 3px 15px 20px;
  cursor: pointer;
  transition: background 0.5s;
  -webkit-transition: background 0.5s;
}
.top-level li:hover{
  background-color: #666 !important;
}
.two-level{
  list-style: none;
  padding: 0;
}
.two-level li{
  padding-left: 60px;
  border: 1px solid #111;
}
.btn-container {
  padding: 10px 20px 10px 20px;
}
.btn-container button{
  font-size: 20px;
}
</style>
