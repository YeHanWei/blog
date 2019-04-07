<template>
  <div class="center-box">
    <header>个人博客系统</header>
    <form>
      <div class="user-op glyphicon glyphicon-user"> 找回密码</div>
      <div>
        <label for="eamil">邮箱</label><!--
        --><input id="eamil" type="email" v-model="email"/>
      </div>
      <div>
        <label for="checkNum">验证码</label><!--
        --><input id="checkNum" style="width: 40%" type="text" v-model="checkNum"/><!--
        --><button type="button" class="get-num" style="width: 40%"  v-on:click="getCheckNum">获取邮箱验证码</button>
      </div>
      <p v-show="isCheckNumErr">*验证码发送失败</p>
      <div>
        <label for="newpwd">新密码</label><!--
        --><input id="newpwd" type="password" v-model="newPwd"/>
      </div>
      <div>
        <label for="renewpwd">重复密码</label><!--
        --><input id="renewpwd" type="password" v-model="reNewPwd"/>
      </div>
      <p v-show="!isSame">新密码与重复密码不一致或密码长度小于8位</p>
      <p v-show="iserr">更改失败，请重试！</p>
      <div>
        <button type="button" v-on:click="findPwd">提交</button>
        <router-link to="/login">
          <button type="button">
          返回登陆
          </button>
        </router-link>
      </div>
    </form>
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
    width: 500px;
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
    font-size: 10px;
    text-align: right;
  }
  .get-num{
    margin: 2px 0 2px 0;
    border: 2px solid white;
  }
  form div:nth-last-child(1) {
    text-align: right;
  }
  a{
    color: inherit;
  }
  button{
    height: 40px;
    width: 20%;
    border: 0;
    background: rgba(50, 50, 255, 0.6);
    font-size: 18px;
  }
</style>
