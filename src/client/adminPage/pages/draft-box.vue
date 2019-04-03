<template>
  <table>
    <thead class="table-header">
    <tr>
      <th style="width: 60%">标题</th>
      <th style="width: 40%">保存时间</th>
    </tr>
    </thead>
    <tbody>
      <admin-draft-box-item
        v-for="draftItem in this.$store.state.article.draftList"
        v-bind:message="draftItem"
      ></admin-draft-box-item>
    </tbody>
  </table>
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
  table{
    width: 100%;
    background: #FAFAFA;
  }
  tr{
    border-bottom: 5px solid #EEEEEE;
  }
  th:nth-child(1){
    padding: 10px 0 10px 10px;
  }
  th:nth-child(n+2) {
    text-align: center;
  }
</style>
