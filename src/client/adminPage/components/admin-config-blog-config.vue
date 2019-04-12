<template>
  <form>
    <div>
      <div>
        <label>博客标题</label>
        <input type="text" v-model="blogTitle"/>
      </div>
      <div>
        <label>博客子标题</label>
        <input type="text" v-model="blogSubTitle"/>
      </div>
      <div>
        <label>博主昵称称</label>
        <input type="text" v-model="name"/>
      </div>
      <div>
        <label>页脚</label>
        <input type="text" v-model="blogFooter" placeholder="支持HTML格式"/>
      </div>
      <div>
        <p class="err" v-show="updateErr">更新失败</p>
        <p class="suc" v-show="updateSuc">更新成功</p>
        <button type="button" @click="updateBlogConfig">更新</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'admin-config-blog-config',
    data() {
      return {
        updateErr: false,
        updateSuc: false
      }
    },
    computed: {
      name: {
        get: function() {
          return this.$store.state.config.name
        },
        set: function (newData) {
          this.$store.commit('config/name', newData)
        }
      },
      blogTitle: {
        get: function() {
          return this.$store.state.config.blogTitle
        },
        set: function (newData) {
          this.$store.commit('config/blogTitle', newData)
        }
      },
      blogSubTitle: {
        get: function() {
          return this.$store.state.config.blogSubTitle
        },
        set: function (newData) {
          this.$store.commit('config/blogSubTitle', newData)
        }
      },
      blogFooter: {
        get: function() {
          return this.$store.state.config.blogFooter
        },
        set: function (newData) {
          this.$store.commit('config/blogFooter', newData)
        }
      },
      isLoad: {
        get: function() {
          return this.$store.state.config.isLoad
        },
        set: function (newData) {
          this.$store.commit('config/isLoad', newData)
        }
      }
    },
    methods: {
      updateBlogConfig() {
        this.updateErr = false
        this.updateSuc = false
        this.$http.post('/data/updateBlogConfig', {
          name: this.name,
          blog_title: this.blogTitle,
          blog_sub_title: this.blogSubTitle,
          blog_footer: this.blogFooter
        }).then(res => {
          if (res.body.iserr === false) {
            this.updateSuc = true
            // 更新vueX状态
            this.$http.get('/data/getBlogConfig').then(res => {
              this.name = res.body.row.name
              this.blogTitle = res.body.row.blog_title
              this.blogSubTitle = res.body.row.blog_sub_title
              this.blogFooter = res.body.row.blog_footer
            })
          } else {
            this.updateErr = true
          }
        }, res => {
          this.updateErr = true
        })
      }
    },
    created() {
      if (this.isLoad === false) {   // 加载状态为false时，从服务器加载数据
        this.$http.get('/data/getBlogConfig').then(res => {
          this.name = res.body.row.name
          this.blogTitle = res.body.row.blog_title
          this.blogSubTitle = res.body.row.blog_sub_title
          this.blogFooter = res.body.row.blog_footer
          this.isLoad = true
        })
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
  .err {
    color: red;
  }
  .suc{
    color: green;
  }
</style>
