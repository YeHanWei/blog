<template>
  <router-link :to="'/tagDetail?tag_id=' + this.message.tag_id.toString()" target="_self">
    <button :id="this.message.tag_id.toString()">{{tagName}}</button>
  </router-link>
</template>

<script>
  export default {
    name: 'blog-tag-list-item',
    props: ['message'],
    data() {
      return {
        tagName: this.message.tag_name
      }
    },
    mounted: function () {
      let btn = document.getElementById(this.message.tag_id.toString())
      let R, G, B
      R = Math.random() * 255
      G = Math.random() * 255
      B = Math.random() * 255
      btn.style.background = 'rgba(' + R + ', ' + G + ', ' + B + ', 0.3)'
      btn.style.color = 'rgba(' + (255 - R) / 2 + ', ' + (255 - G) / 2 + ', ' + (255 - B) / 2 + ')'
    }
  }
</script>

<style scoped>
button{
  margin: 20px 10px;
  padding: 5px 10px;
  font-size: 20px;
  border: 0;
  border-radius: 3px;
}
</style>
