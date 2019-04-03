<template>
  <div>
    <table class="table">
      <thead class="table-header">
      <tr>
        <th style="width: 30%">名称</th>
        <th style="width: 70%">描述</th>
      </tr>
      </thead>
      <tbody>
        <admin-tags-list-item
                v-for="tagMessage in this.$store.state.tag.tagList"
                v-bind:message="tagMessage"
                v-bind:key="tagMessage.tag_id + tagMessage.tag_name + tagMessage.tag_description"
        ></admin-tags-list-item>
      </tbody>
    </table>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>新建标签</h4>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="tagName" class="col-md-1 control-label">名称</label>
            <div class=" col-md-10">
              <input type="text" id="tagName" class="form-control" autocomplete="off" v-model="tag_name"/>
            </div>
          </div>
          <div class="form-group">
            <label for="tagDescription" class="col-md-1 control-label">描述</label>
            <div class="col-md-10">
              <input id="tagDescription" type="text" class="form-control" autocomplete="off" v-model="tag_description">
            </div>
          </div>
          <p v-show="iserr">*错误！请检查是否为空或标签是否存在！</p>
          <div class="form-group">
            <div class="col-md-2 col-md-offset-9">
              <button class="btn btn-success btn-block" type="button" @click="addTag">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminTagsListItem from '../components/admin-tags-list-item'

  export default {
    name: 'tags',
    components: {AdminTagsListItem},
    data() {
      return {
        tag_name: '',
        tag_description: '',
        iserr: false
      }
    },
    methods: {
      // "保存" 按钮点击事件，新增标签
      addTag () {
        this.iserr = false
        if (this.tag_name === '' || this.tag_description === '') {
          this.iserr = true
        } else {
          this.$http.post('/data/addTag', {
            tag_name: this.tag_name,
            tag_description: this.tag_description
          }).then(res => {
            this.iserr = res.body.iserr
            if (this.iserr === false) {
              // 刷新列表
              this.$http.get('/data/tagsList').then(
                (res) => {
                  // 清空输入框
                  this.tag_name = ''
                  this.tag_description = ''
                  // 更新标签列表
                  this.$store.commit('tag/tagList', res.body)
                })
            }
          }, res => {
            this.iserr = true
          })
        }
      }
    },
    // 获取标签列表
    created: function () {
      this.$store.commit('pageState/tagsActive', true)
      if (this.$store.state.tag.tagList.length === 0) {
        this.$http.get('/data/tagsList').then(
          (res) => {
            this.$store.commit('tag/tagList', res.body)
          })
      }
    },
    destroyed: function () {
      this.$store.commit('pageState/tagsActive', false)
    }
  }
</script>

<style scoped>
p {
  color: red;
  font-size: 10px;
  text-align: right;
}
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
</style>
