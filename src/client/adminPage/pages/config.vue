<template>

</template>

<script>
  export default {
    name: 'config',
    created: function () {
      this.$store.commit('pageState/configActive', true)
    },
    destroyed: function () {
      this.$store.commit('pageState/configActive', false)
    }
  }
</script>

<style scoped>

</style>
