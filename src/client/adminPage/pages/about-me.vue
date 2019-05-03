<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3>关于我页面编辑</h3>
    </div>
    <div class="panel-body">
      <mark-down :mode="2" :initialValue="md" :intervar="100" v-on:on-save="getContent"></mark-down>
      <div style="margin-top: 20px; float: right">
        <p v-show="updateErr" class="err">*更新失败，请重试！</p>
        <p v-show="updateSuc" class="suc">更新成功</p>
        <button class="btn btn-success" type="button" @click="update">更新</button>
      </div>
    </div>
  </div>
</template>

<script>
  import MarkDown from 'vue-meditor'
  export default {
    name: 'about-me',
    components: {MarkDown},
    data() {
      return {
        md: '',
        html: '',
        updateErr: false,
        updateSuc: false
      }
    },
    methods: {
      getContent (Value) {
        this.md = Value.markdownValue
        this.html = Value.htmlValue
      },
      update () {
        this.$http.post('/data/updateAboutMe', {about_me_md: this.md, about_me_html: this.html}).then(res => {
          this.updateErr = res.body.updateErr
          if (this.updateErr === false) {
            this.updateSuc = true
            setTimeout(() => {
              this.updateSuc = false
            }, 5000)
          }
        }, res => {
          this.updateErr = true
        })
      }
    },
    created: function () {
      this.$store.commit('pageState/aboutMeActive', true)
      this.$http.get('/data/getAboutMeMd').then(res => {
        this.md = res.body.about_me_md
      })
    },
    destroyed: function () {
      this.$store.commit('pageState/aboutMeActive', false)
    }
  }
</script>

<style scoped>
p{
  text-align: right;
  font-size: 10px;
}
  .err{
    color: red;
  }
  .suc{
    color: green;
  }
</style>
