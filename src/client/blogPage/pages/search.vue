<template>
  <div>
    <form>
      <div>
        <div class="input-content">
          <input class="form-control" type="text" placeholder="请输入搜索内容" v-model="searchText"/>
        </div>
        <div class="btn-content">
          <button class="btn btn-success btn-block" type="button" @click="search">搜索</button>
        </div>
      </div>
    </form>
    <section class="search-results">
      <div class="search-item" v-for="result in this.$store.state.searchResults">
        <header>
          <h3>
            <router-link :to="'/article?article_id=' + result.article_id.toString()" target="_self">
              {{result.article_title}}
            </router-link>
          </h3>
        </header>
        <summary>{{result.article_summary}}</summary>
      </div>
    </section>
    <p class="searchNull"v-if="this.$store.state.isSearchNull">抱歉！未找到相关结果。</p>
  </div>
</template>

<script>
  export default {
    name: 'search',
    computed: {
      searchText: {
        get: function () {
          return this.$store.state.searchText
        },
        set: function (value) {
          this.$store.commit('searchText', value)
        }
      }
    },
    methods: {
      search() {
        this.$http.post('/blogData/search', {search_text: this.searchText}).then(res => {
          if (res.body.results.length === 0) {
            this.$store.commit('isSearchNull', true)
          } else {
            this.$store.commit('isSearchNull', false)
          }
          this.$store.commit('searchResults', res.body.results)
        })
      }
    }
  }
</script>

<style scoped>
  form{
    padding: 10px;
    border: 1px solid #CCCCCC;
  }
  form div{
    text-align: center;
  }
  .input-content{
    display: inline-block;
    max-width: 80%;
    min-width: 60%;
    margin-right: 15px;
  }
  .btn-content{
    display: inline-block;
    min-width: 10%;
    max-width: 20%;
  }
  input, button{
    height: 40px;
    box-sizing: border-box;
  }
  .search-results{
    margin-top: 20px;
  }
  .search-item{
    margin: 0 0 5px 0;
    padding: 10px 20px 10px 20px;
    background: rgba(255, 255, 255, 0.9);
    transition: background 0.7s;
    -webkit-transition: background 0.6s;
  }
  .search-item:hover{
    background: rgba(220, 220, 220, 0.9);
  }
  header{
    margin-bottom: 10px;
  }
  h3{
    margin: 0;
  }
  a{
    color: #555;
    font-weight: 600;
  }
  a:hover{
    color: #039;
    text-decoration: none;
    cursor: pointer;
  }
  summary{
    font-size: 16px;
    color: #888;
    padding: 3px 0 3px 0;
  }
  .searchNull{
    text-align: center;
    font-size: 20px;
    color: rgba(10, 10, 10, 0.5)
  }
</style>
