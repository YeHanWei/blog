<template>
  <a href="#">
    <button class="btn btn-default">
      <span class="glyphicon glyphicon-arrow-up"></span>
    </button>
  </a>
</template>

<script>
  export default {
    name: 'to-top'
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
