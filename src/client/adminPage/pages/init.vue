<template>
  <div class="center-box">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>初始化配置</h3>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="account" class="control-label col-md-4">账号</label>
            <div class="col-md-8">
              <input id="account" class="form-control" type="text" v-model="account"/>
            </div>
          </div>
          <p v-show="isAccoutErr">*账号为1-16位字母、数字与_的组合</p>
          <div class="form-group">
            <label for="password" class="control-label col-md-4">密码</label>
            <div class="col-md-8">
              <input id="password" class="form-control" type="password" v-model="password"/>
            </div>
          </div>
          <p v-show="isPwdErr">*密码格式应为8位以上的字母、数字与_的组合</p>
          <div class="form-group">
            <label for="repwd" class="control-label col-md-4">重复密码</label>
            <div class="col-md-8">
              <input id="repwd" class="form-control" type="password" v-model="rePwd"/>
            </div>
          </div>
          <p v-show="!isSame">*重复密码与密码不一致</p>
          <div class="form-group">
            <label for="email" class="control-label col-md-4">邮箱</label>
            <div class="col-md-8">
              <input id="email" class="form-control" type="email" v-model="email"/>
            </div>
          </div>
          <div class="form-group">
            <label for="email_password" class="control-label col-md-4">邮箱授权码</label>
            <div class="col-md-8">
              <input id="email_password" class="form-control" type="password" v-model="email_password"/>
            </div>
          </div>
          <p v-show="isEmailErr">*邮箱登陆错误，请检查邮箱与授权码是否错误</p>
          <p v-show="iserr">*初始化失败，请重试！</p>
          <div class="form-group">
            <div class="col-md-offset-9">
              <button class="btn btn-success" type="button" v-on:click="initConf">提交</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
            password: this.password,
            email: this.email,
            email_password: this.email_password
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
  .center-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  p{
    color: red;
    text-align: right;
    font-size: 10px;
  }
</style>
