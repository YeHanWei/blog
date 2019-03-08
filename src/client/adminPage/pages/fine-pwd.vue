<template>
  <div class="center-box">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>找回密码</h3>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="eamil" class="control-label col-md-3">邮箱</label>
            <div class="col-md-9">
              <input id="eamil" type="email" class="form-control" v-model="email"/>
            </div>
          </div>
          <div class="form-group">
            <label for="checkNum" class="col-md-3 control-label">验证码</label>
            <div class="col-md-5">
              <input id="checkNum" type="text" class="form-control" v-model="checkNum"/>
            </div>
            <div class="col-md-4">
              <button class="btn btn-default" type="button"  v-on:click="getCheckNum">获取邮箱验证码</button>
            </div>
          </div>
          <p v-show="isCheckNumErr">*验证码发送失败</p>
          <div class="form-group">
            <label for="newpwd" class="control-label col-md-3">新密码</label>
            <div class="col-md-9">
              <input id="newpwd" type="password" class="form-control" v-model="newPwd"/>
            </div>
          </div>
          <div class="form-group">
            <label for="renewpwd" class="control-label col-md-3">重复密码</label>
            <div class="col-md-9">
              <input id="renewpwd" type="password" class="form-control" v-model="reNewPwd"/>
            </div>
          </div>
          <p v-show="!isSame">新密码与重复密码不一致或密码长度小于8位</p>
          <p v-show="iserr">更改失败，请重试！</p>
          <div class="form-group">
            <div class="col-md-2 col-md-offset-7">
              <button class="btn btn-success" type="button" v-on:click="findPwd">提交</button>
            </div>
            <div class="col-md-3">
              <router-link to="/admin/login">
                <button class="btn btn-primary" type="button">
                返回登陆
                </button>
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fine-pwd',
    data() {
      return {
        email: '',
        checkNum: '',
        newPwd: '',
        reNewPwd: '',
        isCheckNumErr: false,
        iserr: false,
        isSame: true
      }
    },
    methods: {
      // 获取邮箱验证码
      getCheckNum: function (event) {
        this.isCheckNumErr = false
        this.$http.post('/data/sendEmail', {email: this.email}).then((res) => {
          this.isCheckNumErr = res.body.isCheckNumErr
        }, (res) => {
          this.isCheckNumErr = true
        })
      },

      findPwd: function (event) {
        this.isSame = true
        this.iserr = false
        if ((this.newPwd !== this.reNewPwd) || this.newPwd.length < 8) {
          this.isSame = false
        } else {
          this.$http.post('/data/finePwd', {
            email: this.email,
            checkNum: this.checkNum,
            newPwd: this.newPwd
          }).then((res) => {
            this.iserr = res.body.iserr
            if (!this.iserr) {
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
    font-size: 10px;
    text-align: right;
  }
</style>
