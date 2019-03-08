<template>
  <!--<blog-header>-->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="botton" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link id="blog-title" calss="navbar-brand" to="/">fineCook</router-link>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-font">
            <li>
              <router-link to="/home">
                <span class="glyphicon glyphicon-home"></span>
                <span>&nbsp;&nbsp;首页</span>
              </router-link>
            </li>
            <li>
              <router-link to="archive">
                <span class="glyphicon glyphicon-folder-open"></span>
                <span>&nbsp;&nbsp;归档</span>
              </router-link>
            </li>
            <li>
              <router-link to="/tags">
                <span class="glyphicon glyphicon-tags"></span>
                <span>&nbsp;&nbsp;标签</span>
              </router-link>
            </li>
            <li>
              <router-link to="/aboutMe">
                <span class="glyphicon glyphicon-user"></span>
                <span>&nbsp;&nbsp;关于我</span>
              </router-link>
            </li>
            <li class="dropdown">
              <router-link to="#" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="glyphicon glyphicon-search"></span>
                <span>&nbsp;&nbsp;站内搜索</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  <!--</blog-header>-->
</template>

<script>

export default {
  name: 'blog-header'
}
</script>

<style scoped>
  #blog-title{
    font-size: 36px;
    font-family: "Vladimir Script", serif;
    font-weight: bold;
    padding-left: 8px;
    padding-right: 30px;
  }
  .navbar-font{
    font-size: 16px;
    font-family: "Microsoft YaHei", serif;
  }
  a:link{
    color: aliceblue;
    text-decoration: none;
  }
  a:visited{
    color: aliceblue;
    text-decoration: none;
  }
  a:hover{
    color: aliceblue;
    text-decoration: none;
  }
  a:active{
    color: aliceblue;
    text-decoration: none;
  }
</style>
