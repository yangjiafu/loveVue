<template>
  <div style="padding-top: 50px">
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <x-icon @click="after()" slot="overwrite-left" type="ios-arrow-left" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <input placeholder="输入搜索电影吧" class="search-style" autofocus type="text" v-model="searchInfo">
      <!--<x-icon type="ios-search-strong" size="30" style="color: #fff;background-color: #fff"></x-icon>-->
    </x-header>
    <div class="search-box">
      <p style="padding: 20px 10px;margin: 0"
         v-if="searchInfo.length >= 1"
         @click="searchPost"
      >搜索"{{searchInfo}}"</p>
      <ul>
        <li>你好</li>
        <li>hello</li>
        <li>word</li>
      </ul>
    </div>
    <p>搜索页</p>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {XHeader}from 'vux'
  export default{
      components:{
          XHeader
      },
      data(){
          return{
//            qs: require('qs'),
            searchInfo:''
        }
      },
      computed:{
        ...mapState(['url','qs'])
      },
      methods:{
          after(){
            this.$router.go(-1)
          },
          goBack(){
            this.$router.go(-1)
          },
          searchPost(){
            this.$http.post(this.url+'search',
              this.qs.stringify({
                'movie':this.searchInfo
              }
              )
            ).then(function (response) {
                console.log(response)
              }).catch(function (error) {
                console.log(error)
              })
          }
      },
//      watch: {
//        $route(to, from) {
//          this.setTitle(to.path)
//        }
//      }
  }

</script>
<style scoped>

  h1 > .vux-header-title{
    margin: 0 20px 0 88px !important;
  }
  .search-style{
    height: 25px;
    width: 110%;
    background-color: transparent;
    color: #f9f9f9;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #f9f9f9
     }
  .search-style:focus{
    outline:none;
  }
  input::-webkit-input-placeholder{
    color: #e9e9e9;opacity:1;
  }
  .search-box{
    margin: auto;
    width: 90%;
    /*height: 500px;*/
    /*background-color: #cccccc;*/
    box-shadow: 0px 0px 30px 10px #eee;
  }
  ul{
    margin: 0;
  }
  ul>li{
    padding: 15px 10px;
    border-top: 1px solid #f0f0f0;
    text-align: left;
  }
</style>
