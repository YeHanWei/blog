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
    computed: {
      disp: function () {
        if (window.innerWidth < 768) {
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
    background: rgba(240, 240, 240, 0.5);
  }
</style>
