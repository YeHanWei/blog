<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3>草稿列表</h3>
    </div>
    <div class="panel-body">
      <table class="table">
        <thead>
        <tr>
          <th style="width: 70%">标题</th>
          <th style="width: 30%">保存时间</th>
        </tr>
        </thead>
        <tbody>
          <admin-draft-box-item
            v-for="draftItem in this.$store.state.article.draftList"
            v-bind:message="draftItem"
          ></admin-draft-box-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import AdminDraftBoxItem from '../components/admin-draft-box-item'
  export default {
    name: 'draft-box',
    components: {AdminDraftBoxItem},
    created: function () {
      this.$store.commit('pageState/draftBoxActive', true)
      if (this.$store.state.article.draftList.length === 0) {
        this.$http.get('/data/draftList').then((res) => {
          this.$store.commit('article/draftList', res.body.rows)
        })
      }
    },
    destroyed: function () {
      this.$store.commit('pageState/draftBoxActive', false)
    }
  }
</script>

<style scoped>

</style>
