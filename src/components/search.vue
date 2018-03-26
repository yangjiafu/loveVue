<template>
  <div style="padding-top: 50px;">
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <x-icon @click="after()" slot="overwrite-left" type="ios-arrow-left" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <input placeholder="输入搜索电影吧"
             class="search-style"
             autofocus
             type="text"
             @keyup.enter="searchPost"
             v-model="searchInfo">
    </x-header>
    <div class="search-box" v-if="searchInfo.length >= 1">
      <p style="padding: 20px 10px;margin: 0"
         @click="searchPost"
      >搜索"{{searchInfo}}"</p>
    </div>
    <button  @click="goPlayVideo">  @click="goPlayVideo"</button>
    <ul  v-if="movieList.length>0">
      <li v-for="item in movieList" @click="goPlayVideo(item.id)">
        <div class="m-info-l">
          <div style="text-align: center">
            <img :src="item.cover" error-class="ximg-error" :offset="-100" >
          </div>
        </div>
        <div class="m-info-r">
          <p>{{item.name}}</p>
          <span>{{item.area}}&nbsp;|&nbsp;{{item.releasetime}}</span>
          <span class="m-r-director">
            {{item.director}}
          </span>
          <span class="m-r-actor">
            {{item.actor}}
          </span>
          <span class="m-r-score">豆瓣评分:{{item.score}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  import {XHeader,XImg}from 'vux'
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
        ...mapMutations(['setMovieList','clearMovieList']),
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
                'movie':this.searchInfo
               }
              )
            ).then(function (response) {
                arr = response.data;
                for(let j in response.data){
                  _this.movieList.push(arr[j])
                }
              _this.setMovieList(_this.movieList)
//                console.log(arr);
                _this.searchInfo = ''
            }).catch(function (error) {
                console.log(error)
              });
          },
          goPlayVideo(id){
//            console.log(id);
            this.$router.push({name:'playVideo',params:{m_id:id}})
          },
      },

  }

</script>
<style>
  .vux-header-title{
    margin: 0 45px 0 60px !important;
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
  .search-style>div{
    margin-top: 0!important;
    padding: 0!important;
    height: 25px;
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
  .m-info-l>div>img{
    /*max-width: 100%;*/
    width: 150px;
  }
  .m-info-r{
    width: 56%;
    height: 200px;
    padding:0 8px;
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
  .m-info-r>.m-r-actor{
    display: block!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    display:-webkit-box!important;
    -webkit-box-orient:vertical!important;
    -webkit-line-clamp:3!important;
  }
  .m-r-director{
    display: block!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    display:-webkit-box!important;
    -webkit-box-orient:vertical!important;
    -webkit-line-clamp:3!important;
  }
  .m-info-r>.m-r-score{
    position: absolute;
    bottom: 0;
    left: 8px;
  }
  /*.error-img{*/
    /*background-image: url("../../static/list/loddingerr.png");*/
  /*}*/

  .ximg-error {
    background-color: yellow;
  }
  .ximg-error:after {
    content: '加载失败';
    color: red;
  }
</style>
