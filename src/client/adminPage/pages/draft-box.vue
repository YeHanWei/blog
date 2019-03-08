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
            v-for="draftItem in draftList"
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
    data() {
      return {
        draftList: []
      }
    },
    created: function () {
      this.$http.get('/data/draftList').then((res) => {
        this.draftList = res.body
      })
    }
  }
</script>

<style scoped>

</style>
