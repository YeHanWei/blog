<template>
  <tr class="item-font">
    <td>
      <span class="item-name">
        {{linkName}}
      </span><br/>
      <button class="control-btn"  data-toggle="modal" :data-target="$data._updateModalID">修改</button>
      <!-- updateModal -->
      <div class="modal fade" :id="updateModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="updateModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeUpdateFriendlyLink">&times;</button>
              <h4 class="modal-title" :id="updateModelLabel">修改友链</h4>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="name" class="col-md-1 control-label">名称</label>
                  <div class="col-md-11">
                    <input type="text" id="name" class="form-control" autocomplete="off" v-model="copyLinkName"/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="url" class="col-md-1 control-label">URL</label>
                  <div class="col-md-11">
                    <input type="text" id="url" class="form-control"  autocomplete="off" v-model="copyLinkUrl"/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="description" class="col-md-1 control-label">描述</label>
                  <div class="col-md-11">
                    <input type="text" id="description" class="form-control"  autocomplete="off" v-model="copyLinkDescription"/>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <p v-show="updateErr">修改失败！</p>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="closeUpdateFriendlyLink">取消</button>
              <button type="button" class="btn btn-success" @click="updateFriendlyLink">确认</button>
            </div>
          </div>
        </div>
      </div>
      <!--<delete-btn v-bind:message="message"></delete-btn>-->
      <button class="control-btn" data-toggle="modal" :data-target="$data._deleteModalID">删除</button>
      <!-- deleteModal -->
      <div class="modal fade" v-bind:id="deleteModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="deleteModelLabel">删除友链</h4>
            </div>
            <div class="modal-body">
              确认删除友链“{{linkName}}”?
            </div>
            <div class="modal-footer">
              <p v-show="deleteErr">删除失败！</p>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-default" v-on:click="deleteFriendlyLink">确认</button>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td><a :href="linkUrl" target="_blank">{{linkUrl}}</a></td>
    <td>{{linkDescription}}</td>
  </tr>
</template>

<script>
  // import deleteBtn from './delete-btn'
  export default {
    name: 'admin-friendly-link-item',
    // components: {deleteBtn},
    props: ['message'],
    data() {
      return {
        linkID: this.message.link_id,
        linkName: this.message.link_name,
        linkUrl: this.message.link_url,
        linkDescription: this.message.link_description,
        copyLinkID: this.message.link_id,
        copyLinkName: this.message.link_name,
        copyLinkUrl: this.message.link_url,
        copyLinkDescription: this.message.link_description,
        deleteErr: false,
        updateErr: false,
        _deleteModalID: '#' + 'delete' + this.message.link_id.toString(),
        deleteModalID: 'delete' + this.message.link_id.toString(),
        deleteModelLabel: 'delete' + this.message.link_id.toString() + 'Label',
        _updateModalID: '#' + 'update' + this.message.link_id.toString(),
        updateModalID: 'update' + this.message.link_id.toString(),
        updateModelLabel: 'update' + this.message.link_id.toString() + 'Label'
      }
    },
    methods: {
      deleteFriendlyLink() {
        this.$http.post('/data/deleteFriendlyLink', {link_id: this.linkID}).then(res => {
          this.deleteErr = res.body.deleteErr
          if (this.deleteErr === false) {
            // 获取友链列表
            this.$http.get('/data/friendlyLinkList').then((res) => {
              this.$store.commit('friendlyLink/friendlyLinkList', res.body.rows)
            })
          }
        }, res => {
          this.deleteErr = true
        })
      },
      // 修改确认事件函数
      updateFriendlyLink() {
        this.updateErr = false
        if (this.copyLinkName === '' || this.copyLinkUrl === '' || this.copyLinkDescription === '') {
          this.updateErr = false
        } else {
          this.$http.post('/data/updateFriendlyLink', {
            link_id: this.copyLinkID,
            link_name: this.copyLinkName,
            link_url: this.copyLinkUrl,
            link_description: this.copyLinkDescription
          }).then(res => {
            this.updateErr = res.body.updateErr
            if (this.updateErr === false) {
              // 获取友链列表
              this.$http.get('/data/friendlyLinkList').then((res) => {
                this.$store.commit('friendlyLink/friendlyLinkList', res.body.rows)
              })
            }
          }, res => {
            this.updateErr = true
          })
        }
      },
      // 取消修改后，所有状态复原，以确保下次修改载入数据的正确性
      closeUpdateFriendlyLink() {
        this.copyLinkID = this.message.link_id
        this.copyLinkName = this.message.link_name
        this.copyLinkUrl = this.message.link_url
        this.copyLinkDescription = this.message.link_description
      }
    }
  }
</script>

<style scoped>
  tr{
    transition: background 0.7s;
    -webkit-transition: background 0.5s;
  }
  tr:hover{
    background-color: rgba(200, 200, 200, 0.6);
  }
  p{
    color: red;
    font-size: 10px;
    text-align: right;
  }
  a:hover{
    text-decoration: none;
    cursor: pointer;
  }
  td:nth-child(1){
    padding: 5px 0 5px 10px;
  }
</style>
