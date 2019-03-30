<template>
  <a href="#"  v-bind:style="{display: disp}">
    <button class="btn btn-default">
      <span class="glyphicon glyphicon-arrow-up"></span>
    </button>
  </a>
</template>

<script>
  export default {
    name: 'to-top',
    data() {
      return {
        sWidth: window.innerWidth
      }
    },
    computed: {
      disp: function () {
        if (this.sWidth < 768) {
          return 'none'
        } else {
          return 'inline-block'
        }
      }
    }
  }
</script>

<style scoped>
  button{
    position: fixed;
    right: 50px;
    bottom: 50px;
    font-size: 20px;
  }
</style>
