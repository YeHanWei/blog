<template>
  <div class="center-box">
    <header>个人博客系统</header>
    <form>
      <div class="user-op glyphicon glyphicon-user"> 登陆</div>
      <div>
        <input id="account" type="text" placeholder="请输入账号" v-model="account"/>
      </div>
      <div>
        <input id="password" type="password" placeholder="请输入密码" v-model="password"/>
      </div>
      <p v-show="iserr">*账号与密码不匹配</p>
      <div style="float: right">
        <span>忘记密码？<router-link to="/findPwd">找回密码</router-link></span><br/>
      </div>
      <button type="button" v-on:click="login">登 陆</button>
    </form>
  </div>
</template>

<script>
  import crypto from 'crypto-js'    // 加解密模块
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
        this.$http.post('/data/login', {
          account: this.account,
          password: crypto.createHash('md5').update(this.password).digest('hex')
        }).then((res) => {
          this.iserr = res.body.iserr
          if (this.iserr) {
            this.account = ''
            this.password = ''
          } else {
            this.setCookie('session', this.account, 60 * 60 * 2)
            this.$router.push('/admin')
          }
        })
      }
    }
  }
</script>

<style scoped>
.center-box{
  position: absolute;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
header{
  text-align: center;
  font-size: 30px;
  color: rgba(30, 30, 30, 0.7);
  padding: 20px 0 20px 0;
  background: rgba(50, 50, 255, 0.6);
}
form{
  padding: 20px;
  background: white;
}
.user-op{
  display: block;
  font-size: 18px;
  padding: 2px 0 2px 0;
}
span{
  display: inline-block;
  padding: 0 0 10px 0;
}
input{
  outline: none;
  display: block;
  width: 100%;
  height: 40px;
  margin: 20px 0 20px 0;
  padding: 0 0 0 10px;
  border: 2px solid rgba(20, 20, 255, 0.1);
  border-radius: 2px;
  background: rgba(200, 200, 200, 0.5);
  font-size: 16px;
}
p{
  color: red;
  font-size: 10px;
  text-align: right;
}
button{
  width: 100%;
  height: 50px;
  border: 0;
  background: rgba(50, 50, 255, 0.6);
  font-size: 24px;
  font-weight: 600;
}
</style>
