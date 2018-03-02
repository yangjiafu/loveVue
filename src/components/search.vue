<template>
  <div>
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <x-icon @click="after()" slot="overwrite-left" type="ios-arrow-left" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <input placeholder="输入搜索电影吧" class="search-style" autofocus type="text" v-model="searchInfo">
      <!--<x-icon type="ios-search-strong" size="35"></x-icon>-->
    </x-header>
    <p>搜索页</p>
  </div>
</template>
<script>
  import {XHeader}from 'vux'
  export default{
      components:{
          XHeader
      },
      data(){
          return{
            searchInfo:''
        }
      },
      methods:{
          after(){
            this.$router.go(-1)
          },
          goBack(){
            this.$router.go(-1)
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
    font-size: 18px;
    border: none;
    border-bottom: 1px solid #f9f9f9
     }
  .search-style:focus{
    outline:none;
  }
  input::-webkit-input-placeholder{
    color: #e9e9e9;opacity:1;
  }
</style>
