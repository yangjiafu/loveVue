<template>
  <div style="padding-top: 50px">
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <x-icon @click="after()" slot="overwrite-left" type="ios-arrow-left" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <input placeholder="输入搜索电影吧"
             class="search-style"
             autofocus
             type="text"
             v-on:onkeydown="searchPost"
             v-model="searchInfo">
      <!--<x-icon type="ios-search-strong" size="30" style="color: #fff;background-color: #fff"></x-icon>-->
    </x-header>
    <div class="search-box" v-if="searchInfo.length >= 1">
      <p style="padding: 20px 10px;margin: 0"
         @click="searchPost"
      >搜索"{{searchInfo}}"</p>
      <!--<ul v-if="movieList.length>0">-->
            <!--<li></li>-->
      <!--</ul>-->

    </div>
    <!--<img src="https://o5omsejde.qnssl.com/demo/test1.jpg" alt="">-->
    <ul  v-if="movieList.length>0">
      <li v-for="item in movieList">
        <div class="m-info-l">
          <!--<img :src="item.cover" alt="">-->
          <x-img  :src="item.cover" :offset="100"></x-img>
        </div>
        <div class="m-info-r">
          <p>{{item.name}}</p>
          <span>{{item.area}}&nbsp;|&nbsp;{{item.releasetime}}</span>
          <span class="m-r-director">
            {{item.director}}
            <!--<span v-for="director in item.director">{{director}}&nbsp;</span>-->
          </span>
          <span class="m-r-actor">
            {{item.actor}}
            <!--<span v-for="actor in item.actor">-->
              <!--{{actor}}-->
            <!--</span>-->
          </span>
          <span class="m-r-score">豆瓣评分:{{item.score}}</span>
        </div>
      </li>
      <!--<li>-->
        <!--<div class="m-info-l">-->
          <!--<img src="static/list/神偷奶爸.jpg" alt="">-->
        <!--</div>-->
        <!--<div class="m-info-r">-->
          <!--<p>神偷奶爸</p>-->
          <!--<span>美国&nbsp;|&nbsp;2010</span>-->
          <!--<span class="m-r-director">冯小刚</span>-->
          <!--<span class="m-r-actor">拉塞尔.布克兰/史蒂夫/杰森.席格尔拉塞尔.布克兰/史蒂夫/杰森.席格尔拉塞尔.布克兰/史蒂夫/杰森.席格尔</span>-->
          <!--<span class="m-r-score">豆瓣评分:9.0</span>-->
        <!--</div>-->
      <!--</li>-->

    </ul>
    <button @click="readArr">修改数组</button>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {XHeader,XImg}from 'vux'
//  import {XHeader} from 'node_modules/vux/XHeader.vue'
  import Vue from 'vue'
  export default{
      components:{
          XHeader,XImg
      },
      data(){
          return{
//            qs: require('qs'),
            searchInfo:'',
            movieList: []
        }
      },
      created:function () {
//        this.searchPost()
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
            let _this = this;
            let arr = [];
            _this.movieList = [];
            this.$http.post(this.url+'search',
              this.qs.stringify({
                'movie':this.searchInfo,
//                'limit':''
              }
              )
            ).then(function (response) {
                arr = response.data;
                for(let j in response.data){
                  _this.movieList.push(arr[j])
                }
              console.log(arr);
            }).catch(function (error) {
                console.log(error)
              });
          },
          readArr(){
            console.log('输出'+this.movieList);
          },

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
    font-size: 14px;
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
    width: 100%;
    height: 210px;
    padding: 5px;
    border-bottom: 1px solid #f0f0f0;
    text-align: left;
  }
  /*ul>li>span{*/
    /*vertical-align:top;*/
  /*}*/
  .m-info-l{
    width: 35%;
    height: 200px;
    float: left;
    text-align: center;
    /*overflow: hidden;*/
  }
  .m-info-l>img{
    /*max-width: 100%;*/
    width: 150px;
  }
  .m-info-r{
    width: 60%;
    height: 200px;
    float: right;
    position: relative;
  }
  .m-info-r>p{
    font-size: 16px;
    color: #000;
  }
  .m-info-r>span{
    font-size: 14px;
    color: #999;
  }
  .m-info-r>.m-r-actor,.m-r-director{
    display: block;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .m-info-r>.m-r-score{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  /*.error-img{*/
    /*background-image: url("../../static/list/loddingerr.png");*/
  /*}*/
</style>
