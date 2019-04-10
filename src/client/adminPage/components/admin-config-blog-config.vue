<template>
  <form>
    <div>
      <div>
        <label>博客标题</label>
        <input type="text"/>
      </div>
      <div>
        <label>博客子标题</label>
        <input type="text"/>
      </div>
      <div>
        <label>博主昵称称</label>
        <input type="text"/>
      </div>
      <div>
        <label>页脚</label>
        <input type="text"/>
      </div>
      <div>
        <button type="button">更新</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'admin-config-blog-config'
  }
</script>

<style scoped>
  form{
    background: white;
    padding: 15px 50px;
  }
  form > div {
    padding: 10px;
    margin: 15px 0;
    border: 1px solid #DBDBDB;
  }
  form > div > div{
    margin: 10px 0;
  }
  form > div > div:nth-last-child(1){
    text-align: center;
  }
  label{
    width: 20%;
    text-align: right;
    font-size: 16px;
    padding-right: 10px;
  }
  input{
    outline: none;
    width: 60%;
    height: 40px;
    padding: 0 0 0 10px;
    border: 2px solid rgba(20, 20, 255, 0.1);
    border-radius: 2px;
    background: rgba(200, 200, 200, 0.5);
    font-size: 16px;
  }
  button{
    width: 100px;
    height: 40px;
    border: 0;
    background: #AAA;
    font-size: 18px;
    color: white;
  }
</style>
