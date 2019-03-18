<template>
  <tr class="item-font">
    <td>
      <span class="item-name">{{draftTitle}}</span><br/>
      <button class="btn btn-default control-btn" @click="edit">编辑</button>
      <button class="btn btn-default control-btn" data-toggle="modal" :data-target="$data._deleteModalID">移除</button>
      <!-- delete modal-->
      <div class="modal fade" :id="deleteModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="deleteModelLabel">删除文章</h4>
            </div>
            <div class="modal-body">
              确认删除草稿《{{draftTitle}}》?
            </div>
            <div class="modal-footer">
              <p v-show="deleteErr">删除失败！</p>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-default" @click="deleteDraft">确认</button>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>{{saveTime}}</td>
  </tr>
</template>

<script>
  export default {
    name: 'admin-draft-box-item',
    props: ['message'],
    data() {
      return {
        draftTitle: this.message.draft_title,
        saveTime: this.message.draft_time,
        deleteErr: false,
        _deleteModalID: '#' + 'delete' + this.message.draft_id.toString(),
        deleteModalID: 'delete' + this.message.draft_id.toString(),
        deleteModelLabel: 'delete' + this.message.draft_id.toString() + 'Label'
      }
    },
    methods: {
      edit: function () {
        this.$http.post('/data/getDraft', {draft_id: this.message.draft_id}).then(res => {
          this.$store.commit('article/article_id', res.body.rows[0].draft_id)
          this.$store.commit('article/article_title', res.body.rows[0].draft_title)
          this.$store.commit('article/article_md', res.body.rows[0].draft_content)
          this.$store.commit('article/article_summary', res.body.rows[0].draft_summary)
          this.$store.commit('article/article_tag', res.body.rows[0].draft_tags)
          this.$store.commit('article/isUpdate', true)
          this.$router.push('/admin/newArticle')
        })
      },
      deleteDraft: function () {
        this.$http.post('/data/deleteDraft', {draft_id: this.message.draft_id}).then(res => {
          this.deleteErr = res.body.deleteErr
          if (this.deleteErr === false) {
            window.location = window.location
          }
        }, res => {
          this.deleteErr = true
        })
      }
    }
  }
</script>

<style scoped>
  tr:hover{
    background-color: rgba(200, 200, 200, 0.6);
  }
</style>
