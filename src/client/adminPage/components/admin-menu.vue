<template>
  <div id="menu">
    <ul class="nav nav-tabs nav-stacked top-level">
      <li>
        <a data-toggle="collapse" href="#articleList">
          <span class="glyphicon glyphicon-align-right"></span>
          &nbsp;文章管理
        </a>
        <ul id="articleList" class="nav collapse in two-level">
          <li>
            <router-link to="/admin/articleList">
              <span class="glyphicon glyphicon-list-alt"></span>
              &nbsp;文章列表
            </router-link>
          </li>
          <li>
            <router-link to="/admin/newArticle">
              <span class="glyphicon glyphicon-pencil"></span>
              &nbsp;新建文章
            </router-link>
          </li>
          <li>
            <router-link to="/admin/draftBox">
              <span class="glyphicon glyphicon-tasks"></span>
              &nbsp;草稿箱
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link to="/admin/comments">
          <span class="glyphicon glyphicon-comment"></span>
          &nbsp;评论管理
        </router-link>
      </li>
      <li>
        <router-link to="/admin/tags">
          <span class="glyphicon glyphicon-tags"></span>
          &nbsp;标签管理
        </router-link>
      </li>
      <li>
        <router-link to="/admin/friendlyLink">
          <span class="glyphicon glyphicon-link"></span>
          &nbsp;友链管理
        </router-link>
      </li>
      <li>
        <router-link to="/admin/config">
          <span class="glyphicon glyphicon-wrench"></span>
          &nbsp;参数设置
        </router-link>
      </li>
      <li>
        <router-link to="/admin/aboutMe">
          <span class="glyphicon glyphicon-exclamation-sign"></span>
          &nbsp;关于我
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'admin-menu',
    data() {
      return {
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
.top-level{
  padding: 20px 0 20px 20px;
  font-size: 20px;
  border-bottom: 1px solid #111111;
}
.top-level li a{
  color: #EEEEEE;
  padding: 15px 3px;
  cursor: pointer;
}
.top-level li a:hover{
  background-color: #555;
  border: 1px solid #111111;
  border-radius: 0;
}
.two-level li a{
  padding-left: 40px;
  border: 1px solid #111;
}


</style>
