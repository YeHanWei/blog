<template>
  <div class="panel-body">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="title" class="control-label">标题：</label>
        <span class="err" v-show="titleIsNull">*标题不能为空</span>
        <div class="col-md-12">
          <input id="title" class="form-control" autocomplete="off" v-model="title"/>
        </div>
      </div>
      <div class="form-group">
        <label for="content" class="control-label">正文：</label>
        <span class="err" v-show="mdIsNull">*文章内容不能为空</span>
        <div class="col-md-12">
          <mark-down class="col-md-12" id="content" :mode="3" :initialValue="md" v-on:on-save="getContent"></mark-down>
        </div>
      </div>
      <div class="form-group">
        <label for="tags" class="control-label">标签：</label><small>标签之间使用“;”隔开，至少1个，最多5个</small>
        <span class="err" v-show="tagsIsErr">*标签数量不正确</span>
        <div class="col-md-12">
          <input id="tags" type="text" class="form-control" autocomplete="off" v-model="tags"/>
        </div>
      </div>
      <div class="form-group">
        <label for="summary">摘要：</label>
        <span class="err" v-show="summaryIsNull">*摘要不能为空</span>
        <div class="col-md-12">
          <textarea id="summary" rows="3" class="form-control" v-model="summary"></textarea>
        </div>
      </div>
      <p class="err err-right" v-show="isPublicErr">*文章发布失败</p>
      <p class="err err-right" v-show="isSaveErr">*保存失败</p>
      <div class="form-group">
        <div class="col-md-offset-8 col-md-2">
          <button class="btn btn-success btn-block" type="button" v-on:click="saveDraft">保存</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-success btn-block" type="button" v-on:click="publicArticle">发布</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import MarkDown from 'vue-meditor'
  export default {
    name: 'new-article',
    components: {MarkDown},
    data() {
      return {
        id: this.$store.state.article.article_id,
        title: this.$store.state.article.article_title,
        md: this.$store.state.article.article_md,   // 文章内容，md格式
        html: this.$store.state.article.article_html, // 文章内容，HTML格式
        summary: this.$store.state.article.article_summary,
        tags: this.$store.state.article.article_tag,
        // 状态
        titleIsNull: false,
        mdIsNull: false,
        tagsIsErr: false,
        summaryIsNull: false,
        isPublicErr: false,
        isSaveErr: false
      }
    },
    methods: {
      // 重置所有状态
      _reset () {
        this.titleIsNull = false
        this.mdIsNull = false
        this.tagsIsErr = false
        this.summaryIsNull = false
        this.isPublicErr = false
        this.isSaveErr = false
      },

      // "发布"按钮点击事件，发布文章
      publicArticle () {
        // 状态重置
        this._reset()
        // 验证表单
        if (this.title === '') {
          this.titleIsNull = true
        } else if (this.md === '') {
          this.mdIsNull = true
        } else if (this.summary === '') {
          this.summaryIsNull = true
        } else {
          let tagsArr = [...new Set(this.tags.split(';'))].filter(d => d)    // 标签数组（去重去空）
          if (this.tags === '' || tagsArr.length > 5) {
            this.tagsIsErr = true
          } else {
            // 发送http请求
            this.$http.post('/data/public', {
              article_id: this.id === '' ? undefined : this.id,
              article_title: this.title,
              article_md: this.md,
              article_html: this.html,
              article_summary: this.summary,
              tags: tagsArr
            }).then((res) => {
              this.isPublicErr = res.body.isPublicErr
              if (this.isPublicErr === false) {
                this.$http.get('/data/getArticle').then((res) => {
                  this.iserr = res.body.iserr
                  this.$store.commit('article/articleList', res.body.rows)
                  this.$router.push('/admin/articleList')
                })
              }
            }, (res) => {
              this.isPublicErr = true
            })
          }
        }
      },

      saveDraft () {
        this._reset()
        if (this.title === '') {
          this.titleIsNull = true
        } else {
          this.$http.post('/data/saveDraft', {
            draft_id: this.id === '' ? undefined : this.id,
            draft_title: this.title,
            draft_content: this.md,
            draft_summary: this.summary,
            draft_tags: this.tags
          }).then((res) => {
            this.isSaveErr = res.body.isSaveErr
            if (!this.isSaveErr) {
              // 刷新草稿列表
              this.$http.get('/data/draftList').then((res) => {
                this.$store.commit('article/draftList', res.body.rows)
              })
            }
          }, (res) => {
            this.isSaveErr = true
          })
        }
      },

      getContent (Value) {
        this.md = Value.markdownValue
        this.html = Value.htmlValue
      }
    },
    beforeDestroy: function () {
      this.$store.commit('article/clearStates')
    }
  }
</script>

<style scoped>
label {
  font-size: 20px;
}
  .err {
    color: red;
    font-size: 10px;
  }
  .err-right{
    text-align: right;
  }
</style>
