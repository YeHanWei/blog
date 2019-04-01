<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>友链列表</h3>
      </div>
      <div class="panel-body">
        <p v-show="getListErr">获取友链列表错误列表</p>
        <table class="table" v-show="!getListErr">
          <thead>
          <tr class="table-header">
            <th style="width: 15%">名称</th>
            <th style="width: 35%">URL</th>
            <th style="width: 50%">描述</th>
          </tr>
          </thead>
          <tbody>
          <admin-friendly-link-item
            v-for="friendlyLinkItem in this.$store.state.friendlyLink.friendlyLinkList"
            v-bind:message="friendlyLinkItem"
            v-bind:key="friendlyLinkItem.link_name + friendlyLinkItem.link_url + friendlyLinkItem.link_description"
          ></admin-friendly-link-item>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>新增友链</h4>
      </div>
      <div class="panel-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="name" class="col-md-1 control-label">名称</label>
            <div class="col-md-10">
              <input type="text" id="name" class="form-control" autocomplete="off" v-model="linkName"/>
            </div>
          </div>
          <div class="form-group">
            <label for="url" class="col-md-1 control-label">URL</label>
            <div class="col-md-10">
              <input type="text" id="url" class="form-control"  autocomplete="off" v-model="linkUrl"/>
            </div>
          </div>
          <div class="form-group">
            <label for="description" class="col-md-1 control-label">描述</label>
            <div class="col-md-10">
              <input type="text" id="description" class="form-control"  autocomplete="off" v-model="linkDescription"/>
            </div>
          </div>
          <p v-show="iserr">*错误！请检查表单是否为空，或友链是否已存在！</p>
          <div class="form-group">
            <div class="col-md-2 col-md-offset-9">
              <button class="btn btn-success btn-block" type="button" @click="addFriendlyLink">保存</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminFriendlyLinkItem from '../components/admin-friendly-link-item'
  export default {
    name: 'friendly-link',
    components: {AdminFriendlyLinkItem},
    data() {
      return {
        getListErr: false,
        linkName: '',
        linkUrl: '',
        linkDescription: '',
        iserr: false
      }
    },
    methods: {
      // 新增友链事件
      addFriendlyLink() {
        this.iserr = false
        // 判断是否有空项目
        if (this.linkName === '' || this.linkUrl === '' || this.linkDescription === '') {
          this.iserr = true
        } else {
          // 发送新增友链请求
          this.$http.post('/data/addFriendlyLink', {
            link_name: this.linkName,
            link_url: this.linkUrl,
            link_description: this.linkDescription
          }).then(res => {
            this.iserr = res.body.iserr
            if (this.iserr === false) {
              this.linkName = ''
              this.linkUrl = ''
              this.linkDescription = ''
              this.iserr = false
              // 获取友链列表
              this.$http.get('/data/friendlyLinkList').then((res) => {
                this.getListErr = res.body.getListErr
                this.$store.commit('friendlyLink/friendlyLinkList', res.body.rows)
              })
            }
          }, res => {
            this.iserr = true
          })
        }
      }
    },

    created: function() {
      // 获取友链列表
      if (this.$store.state.friendlyLink.friendlyLinkList.length === 0) {
        this.$http.get('/data/friendlyLinkList').then((res) => {
          this.getListErr = res.body.getListErr
          this.$store.commit('friendlyLink/friendlyLinkList', res.body.rows)
        },
          (res) => {
            this.getListErr = true
          })
      }
    }
  }

</script>

<style scoped>
p {
  color: red;
  font-size: 10px;
  text-align: right;
}
</style>
