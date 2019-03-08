<template>
  <div class="center-box">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>登陆</h3>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="account" class="control-label col-md-3">账号：</label>
            <div class="col-md-9">
              <input id="account" type="text" class="form-control" v-model="account"/>
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="control-label col-md-3">密码：</label>
            <div class="col-md-9">
              <input id="password" type="password" class="form-control" v-model="password"/>
            </div>
          </div>
          <p v-show="iserr">*账号与密码不匹配</p>
          <div style="float: right">
            <span>忘记密码？<router-link to="/admin/finePwd">找回密码</router-link></span><br/>
          </div>
          <div class="form-group" style="float: right;clear: both">
            <button class="btn btn-success" type="button" v-on:click="login">登陆</button>
            <span>&nbsp;&nbsp;</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        iserr: false,     // 账号与密码是否匹配
        account: '',   // 账号
        password: ''       // 密码
      }
    },
    methods: {
      /*
      *“登陆”按键触发事件
      * 发送账号密码至服务器端检查
      * 接收返回账号与密码是否匹配的数据
      * 不匹配则将iserr设为true，匹配则跳转首页
      */
      login: function(event) {
        this.$http.post('/data/login', {account: this.account, password: this.password}).then((res) => {
          this.iserr = res.body.iserr
          if (this.iserr) {
            this.account = ''
            this.password = ''
          } else {
            window.location = '/admin/articleList'
          }
        })
      }
    }
  }
</script>

<style scoped>
.center-box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  span{
    display: inline-block;
    padding: 0 0 10px 0;
  }
  p{
    color: red;
    font-size: 10px;
    text-align: center;
  }
</style>
