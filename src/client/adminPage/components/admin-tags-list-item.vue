<template>
  <tr class="item-font">
    <td>
      <span class="item-name">{{tagName}}</span><br/>
      <button class="btn btn-default control-btn" data-toggle="modal" :data-target="$data._updateModalID">修改</button>
      <!-- updateModal -->
      <div class="modal fade" :id="updateModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="updateModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeUpdateTag">&times;</button>
              <h4 class="modal-title" :id="updateModelLabel">修改标签</h4>
            </div>
            <div class="modal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="tagName" class="col-md-1 control-label">名称</label>
                  <div class=" col-md-10">
                    <input type="text" id="tagName" class="form-control" autocomplete="off" v-model="copyTagName"/>
                  </div>
                </div>
                <div class="form-group">
                  <label for="tagDescription" class="col-md-1 control-label">描述</label>
                  <div class="col-md-10">
                    <input id="tagDescription" type="text" class="form-control" autocomplete="off" v-model="copyTagDescription">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <p v-show="updateErr">修改失败！</p>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="closeUpdateTag">取消</button>
              <button type="button" class="btn btn-success" @click="updateTag">确认</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-default control-btn" data-toggle="modal" :data-target="$data._deleteModalID">删除</button>
      <!-- deleteModal -->
      <div class="modal fade" :id="deleteModalID" data-backdrop="false" tabindex="-1" :aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" :id="deleteModelLabel">删除标签</h4>
            </div>
            <div class="modal-body">
              确认删除标签“{{tagName}}”?
            </div>
            <div class="modal-footer">
              <p v-show="deleteErr">删除失败！</p>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-default" @click="deleteTag">确认</button>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>{{tagDescription}}</td>
  </tr>
</template>

<script>
  export default {
    name: 'admin-tags-list-item',
    props: ['message'],
    data() {
      return {
        tagID: this.message.tag_id,
        tagName: this.message.tag_name,
        tagDescription: this.message.tag_description,
        copyTagID: this.message.tag_id,
        copyTagName: this.message.tag_name,
        copyTagDescription: this.message.tag_description,
        deleteErr: false,
        updateErr: false,
        _deleteModalID: '#' + 'delete' + this.message.tag_id.toString(),
        deleteModalID: 'delete' + this.message.tag_id.toString(),
        deleteModelLabel: 'delete' + this.message.tag_id.toString() + 'Label',
        _updateModalID: '#' + 'update' + this.message.tag_id.toString(),
        updateModalID: 'update' + this.message.tag_id.toString(),
        updateModelLabel: 'update' + this.message.tag_id.toString() + 'Label'
      }
    },
    methods: {
      deleteTag() {
        this.$http.post('/data/deleteTag', {tag_id: this.copyTagID}).then(res => {
          this.deleteErr = res.body.deleteErr
          if (this.deleteErr === false) {
            this.$http.get('/data/tagsList').then(
              (res) => {
                // 向父主件传值
                this.$emit('getTagList', res.body)
              })
          }
        }, res => {
          this.deleteErr = true
        })
      },
      updateTag() {
        this.updateErr = false
        if (this.copyTagName === '' || this.copyTagDescription === '') {
          this.updateErr = true
        } else {
          this.$http.post('/data/updateTag', {
            tag_id: this.copyTagID,
            tag_name: this.copyTagName,
            tag_description: this.copyTagDescription
          }).then(res => {
            this.updateErr = res.body.updateErr
            if (this.updateErr === false) {
              // 刷新列表
              this.$http.get('/data/tagsList').then(
                (res) => {
                  // 向父主件传值
                  this.$emit('getTagList', res.body)
                })
            }
          }, res => {
            this.updateErr = true
          })
        }
      },
      closeUpdateTag() {
        this.copyTagID = this.message.tag_id
        this.copyTagName = this.message.tag_name
        this.copyTagDescription = this.message.tag_description
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
</style>
