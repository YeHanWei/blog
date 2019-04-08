<template>
  <div class="center-box">
    <header>个人博客系统</header>
    <form>
      <div class="user-op glyphicon glyphicon-user"> 初始化配置</div>
      <!-- lable与input之间的注释是为了消除两个inline-bloke之间的空格 -->
      <div>
        <label for="account">账号</label><!--
        --><input id="account" type="text" v-model="account"/>
      </div>
      <p v-show="isAccoutErr">*账号为1-16位字母、数字与_的组合</p>
      <div>
        <label for="password">密码</label><!--
        --><input id="password" type="password" v-model="password"/>
      </div>
      <p v-show="isPwdErr">*密码格式应为8位以上的字母、数字与_的组合</p>
      <div>
        <label for="repwd">重复密码</label><!--
        --><input id="repwd" type="password" v-model="rePwd"/>
      </div>
      <p v-show="!isSame">*重复密码与密码不一致</p>
      <div>
        <label for="email">邮箱</label><!--
        --><input id="email" type="email" v-model="email"/>
      </div>
      <div>
        <label for="email_password">邮箱授权码</label><!--
        --><input id="email_password" type="password" v-model="email_password"/>
      </div>
      <p v-show="isEmailErr">*邮箱登陆错误，请检查邮箱与授权码是否错误</p>
      <p v-show="iserr">*初始化失败，请重试！</p>
      <div class="btn-content">
        <button type="button" v-on:click="initConf">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
  import crypto from 'crypto'    // 加解密模块
  import DES from '../../../source/javascript/DES'
  export default {
    name: 'init',
    data() {
      return {
        account: '',
        password: '',
        rePwd: '',
        email: '',
        email_password: '',
        isAccoutErr: false,
        isPwdErr: false,
        isSame: true,
        isEmailErr: false,
        iserr: false,
        isnull: false
      }
    },
    methods: {
      initConf: function (event) {
        if (/\W/.test(this.account) || this.account.length < 1 || this.account.length > 16) {
          // 账号格式错误
          this.isAccoutErr = true
        } else if (/\W/.test(this.password) || this.password.length < 8) {
          // 密码格式错误
          this.isPwdErr = true
        } else if (this.password !== this.rePwd) {
          // 重复密码与密码不一致
          this.isSame = false
        } else if (this.email === '' || this.email_password === '') {
          // 邮箱、邮箱授权码、如果为空，错误
          this.isnull = true
        } else {
          // 验证无误后发送http请求
          this.$http.post('/data/init', {
            account: this.account,
            password: crypto.createHash('md5').update(this.password).digest('hex'), // 密码使用MD5进行加密
            email: this.email,
            email_password: DES.desEncrypt(this.email_password)     // 邮箱验证码使用DES进行加密
          }).then((res) => {
            this.isEmailErr = res.body.isEmailErr
            this.iserr = res.body.iserr
            if (!this.isEmailErr && !this.iserr) {
              window.location = '/admin/login'
            }
          }, (res) => {
            this.iserr = true
          })
        }
      }
    }
  }
</script>

<style scoped>
  /* 不定宽高居中 */
  .center-box{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
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
  form div{
    margin: 20px 0 20px 0;
  }
  label{
    display: inline-block;
    text-align: right;
    width: 20%;
    padding-right: 10px;
  }
  input{
    outline: none;
    display: inline-block;
    width: 80%;
    height: 40px;
    padding: 0 0 0 10px;
    border: 2px solid rgba(20, 20, 255, 0.1);
    border-radius: 2px;
    background: rgba(200, 200, 200, 0.5);
    font-size: 16px;
  }
  p{
    color: red;
    text-align: right;
    font-size: 10px;
  }
  .btn-content{
    text-align: right;
  }
  button{
    width: 80%;
    height: 50px;
    border: 0;
    background: rgba(50, 50, 255, 0.6);
    font-size: 24px;
    font-weight: 600;
  }
</style>
