<template>
  <div class="comment">
    <div>
      <span class="name">{{comment.comment_username}}：</span><span class="content">{{comment.comment_content}}</span>
    </div>
    <div class="time">{{comment.comment_time}}</div>
  </div>
</template>

<script>
  export default {
    name: 'blog-comment-list-item',
    props: ['message'],
    data() {
      return {
        comment: this.message
      }
    }
  }
</script>

<style scoped>
  .comment{
    border-bottom: 1px dashed #2aabd2;
    margin: 10px 0;
    padding: 5px;
  }
  .name{
    font-size: 22px;
    color: #2e6da4;
  }
  .time{
    color: #292929;
    padding: 5px 0;
  }
  .content{
    font-size: 20px;
  }
</style>
