<template>
  <form>
    <!-- 修改密码 -->
    <div>
      <div>
        <label>密码</label><span>******************</span>
      </div>
      <div>
        <label>原密码</label>
        <input type="password" v-model="oldPwd"/>
      </div>
      <div>
        <label>新密码</label>
        <input type="password" v-model="newPwd"/>
      </div>
      <div>
        <label>重复新密码</label>
        <input type="password" v-model="reNewPwd"/>
      </div>
      <div>
        <p class="err">{{pwdErr}}</p>
        <p class="suc" v-show="pwdSuc">密码修改成功</p>
        <button type="button" @click="updatePwd">修改密码</button>
      </div>
    </div>
  </form>
</template>

<script>
  import crypto from 'crypto'    // 加解密模块
  export default {
    name: 'admin-config-user-manage',
    data() {
      return {
        oldPwd: '',
        newPwd: '',
        reNewPwd: '',
        pwdErr: '',
        pwdSuc: false
      }
    },
    methods: {
      // 更改密码
      updatePwd() {
        this.pwdErr = ''
        this.pwdSuc = false
        if (/\W/.test(this.newPwd) || this.newPwd.length < 8) {
          this.pwdErr = '新密码格式错误！'
        } else if (this.newPwd !== this.reNewPwd) {
          this.pwdErr = '新密码与重复密码不一致！'
        } else {
          this.$http.post('/data/updatePwd', {
            old_password: crypto.createHash('md5').update(this.oldPwd.toString()).digest('hex'),
            new_password: crypto.createHash('md5').update(this.newPwd.toString()).digest('hex')
          }).then(res => {
            if (res.body.iserr === false) {
              this.pwdSuc = true
              this.oldPwd = ''
              this.newPwd = ''
              this.reNewPwd = ''
            } else {
              this.pwdErr = res.body.iserr
            }
          }, res => {
            this.pwdErr = '密码修改失败'
          })
        }
      }
    }
  }
</script>

<style scoped>
  form{
    background: white;
    padding: 15px 50px;
  }
  form > div {
    padding: 10px;
    margin: 15px 0;
    border: 1px solid #DBDBDB;
  }
  form > div > div{
    margin: 10px 0;
  }
  form > div > div:nth-last-child(1){
    text-align: center;
  }
  label{
    width: 20%;
    text-align: right;
    font-size: 16px;
    padding-right: 10px;
  }
  input{
    outline: none;
    width: 60%;
    height: 40px;
    padding: 0 0 0 10px;
    border: 2px solid rgba(20, 20, 255, 0.1);
    border-radius: 2px;
    background: rgba(200, 200, 200, 0.5);
    font-size: 16px;
  }
  button{
    width: 100px;
    height: 40px;
    border: 0;
    background: #AAA;
    font-size: 18px;
    color: white;
  }
  .err{
    color: red;
  }
  .suc{
    color: green;
  }
</style>
