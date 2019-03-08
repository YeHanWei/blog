<template>
  <footer>
    <div>
      <a class="friendly-link-item" v-for="link in links" :href="link.link_url" target="_blank">
        {{link.link_name}}
      </a>
    </div>
    <div class="authorize">
      Copyright &#169 2019 叶汉伟
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'blog-footer',
    data() {
      return {
        links: []
      }
    },
    created: function () {
      this.$http.get('/blogData/getFriendlyLinks').then(res => {
        this.links = res.body
      })
    }
  }
</script>

<style scoped>
footer{
  width: 100%;
  background-color: #0f0f0f;
  color: white;
  padding: 10px 30px;
  /*grid-row-start: 2;*/
  /*grid-row-end: 3;*/

}
.friendly-link-item{
  display: inline-block;
  padding: 5px 15px;
  font-size: 12px;
  color: white;
}
.authorize{
  padding: 10px;
  text-align: center;
}
</style>
