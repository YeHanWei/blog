<template>
  <router-link :to="'/tagDetail?tag_id=' + this.message.tag_id.toString()" target="_self">
    <button :id="this.message.tag_id.toString()">{{this.message.tag_name}}</button>
  </router-link>
</template>

<script>
  export default {
    name: 'blog-tag-list-item',
    props: ['message'],
    mounted: function () {
      let btn = document.getElementById(this.message.tag_id.toString())
      let R, G, B
      R = String(Math.floor(Math.random() * 255))
      G = String(Math.floor(Math.random() * 255))
      B = String(Math.floor(Math.random() * 255))
      btn.style.background = 'rgba(' + R.toString() + ', ' + G.toString() + ', ' + B.toString() + ', 0.3)'
      btn.style.color = 'rgba(' + (255 - R) / 2 + ', ' + (255 - G) / 2 + ', ' + (255 - B) / 2 + ', 1)'
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
