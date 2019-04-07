<template>
  <div v-html="this.$store.state.aboutMe"></div>
</template>

<script>
  export default {
    name: 'about-me',
    created: function () {
      if (!this.$store.state.aboutMe) {
        this.$http.get('/blogData/getAboutMeHtml').then(res => {
          this.$store.commit('aboutMe', res.body.about_me_html)
        })
      }
    }
  }
</script>

<style scoped>
div{
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
}
</style>
