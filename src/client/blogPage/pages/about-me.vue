<template>
  <div v-html="aboutMeHtml"></div>
</template>

<script>
  export default {
    name: 'about-me',
    data() {
      return {
        aboutMeHtml: ''
      }
    },
    created: function () {
      this.$http.get('/blogData/getAboutMeHtml').then(res => {
        this.aboutMeHtml = res.body.about_me_html
      })
    }
  }
</script>

<style scoped>

</style>
