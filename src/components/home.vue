<template>
  <div style="height: 100%;padding-bottom: 54px">
    <swiper height="150px" :aspect-ratio="300/800" auto loop v-model="swiperItemIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in movies.new" :key="index" >
        <img :src="item.cover" @click="goMovieInfo(item.id)">
        <p class="movie-title">{{item.name}}</p>
      </swiper-item>
    </swiper>
    <div class="movie-box">
      <div class="m-box-head m-comedy-bg">喜剧电影</div>
      <div v-for="(item,index) in movies.comedy"
        :class="{'m-box-one':index==0,'m-box-other':index>0}"
        class=" left" @click="goMovieInfo(item.id)">
        <img :src="item.cover" alt="">
      </div>
    </div>
    <div class="movie-box">
      <div class="m-box-head m-action-bg">动作电影</div>
      <div v-for="(item, index) in movies.action"
        :class="{'m-box-one':index==1,'m-box-other':index!=1}"
        class=" left" @click="goMovieInfo(item.id)">
        <img :src="item.cover" alt="">
      </div>
    </div>
    <div class="movie-box">
      <div class="m-box-head m-fantasy-bg">奇幻电影</div>
      <div v-for="(item, index) in movies.fantasy"
        :class="{'m-box-one':index==3,'m-box-other':index!=3}"
        class=" left" @click="goMovieInfo(item.id)">
        <img :src="item.cover" alt="">
      </div>
    </div>
    <div class="movie-box">
      <div class="m-box-head m-war-bg">战争电影</div>
      <div v-for="(item, index) in movies.war"
        :class="{'m-box-one':index==3,'m-box-other':index!=3}"
        class=" left" @click="goMovieInfo(item.id)">
        <img :src="item.cover" alt="">
      </div>
    </div>
    <br><br>
    <!--<button @click="setCookieUser">写入cookie</button>-->
    <!--<button @click="getCookieUser">读取cookie</button>-->
    <!--<button @click="clearCookieUser">清除cookie</button>-->
    <!--<button @click="cos">home</button>-->
    <!--&lt;!&ndash;<button @click="">axios测试</button>&ndash;&gt;-->

  </div>
</template>

<script>
  import { Swiper,SwiperItem } from 'vux'
//  import routes from './router'
  import { mapState,mapMutations } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'home',
    components:{
      Swiper, SwiperItem
    },
    computed:{
      ...mapState(['qs','url','user'])
    },
    data(){
      return{
//        cookie:'',
//        userInfo:{
//          name:'杨',
//          token:'12321asd',
//          pwd:'123'
//        },
        swiperItemIndex:1,
        movies:{
//            new:'',
//            comedy:'',
//            action:'',
//            fantasy:'',
//            war:''
        }
      }
    },
    created:function () {
      var _this = this
      _this.$http.get('http://localhost:8000/'+'getNewMovie',{
          params:{
            place:'home',
            start:'',
            limit:''
          }
        }
      ).then(function (res) {
        console.log(res);
        _this.movies = res.data
//        _this.
//        for(var m in res.data.new){
//            var obj ={}
//            obj.name=res.data.new[m].name
//            obj.score=res.data.new[m].score
//            obj.cover=res.data.new[m].cover
//            obj.id=res.data.new[m].id
//          _this.newMovie.push(obj)
//        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    methods:{
      ...mapMutations(['setCookie','getCookie']),
      cos(){
        console.log('home点击');
      },
      push_movie(arr){
          let movieList=[]
        for(let m in arr){
          let obj ={}
          obj.name=arr[m].name
          obj.score=arr[m].score
          obj.cover=arr[m].cover
          obj.id=arr[m].id
          movieList.push(obj)
        }
        return movieList
      },
//      ...mapMutations([
//        'setUserInfo','cheakUserInfo'
//      ]),
//      init(){
//        console.log('页面加载执行函数')
//
//      },
//      setCookie(){
//        this.setUserInfo(this.userInfo)
////        console.log('读取')
//      },
      goHome:()=>{
        console.log('gohome');
//        routes.push({name:'home'})
      },
      goMovieInfo(id){
        console.log(id)
        this.$router.push({name:'search',query:{id:id}})
      },
      setCookieUser(){
          this.setCookie({u_id:'12',u_token:'asfdawer234awefdsfwe',u_days:7})
      },
      getCookieUser(){
          var o = this.getCookie()
        console.log(0);
      },
      clearCookieUser(){
        this.setCookie({id:'',token:'',days:-1});
      }

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  .swiper-demo-img img {
    width: 100%;
  }

  .vux-slider .movie-title{
    position: absolute;
    left: 0;
    bottom: 0;
    color:#fff;
    min-width: 100%;
    padding: 4px 0;
    background:-webkit-gradient(linear,right bottom,0 0,from(rgba(0,0,0,.3)),to(rgba(9,9,9,0)));
    background:linear-gradient(to left, rgba(0,0,0,.3),rgba(9,9,9,0));
    /*background:-webkit-radial-gradient(rgba(0,0,0,.2),rgba(9,9,9,.1),rgba(9,9,9,0));*/
    z-index: 999
  }
  .movie-box{
    height:240px;
    width: 100%;
    margin-top: 20px;
    /*overflow: hidden;*/
    position: relative;
  }
  .movie-box .m-box-head{
    width: 30%;
    height:30px;
    border-radius: 0 15px 15px 0;
    display: inline-block;
    position: absolute;
    top: -15px;
    left: 0;
    font-size: 14px;
    line-height: 30px;
    color: #fff;
    background:linear-gradient(to right, rgba(124,230,255,1),rgba(16,174,255,1));
    /*background: #10aeff;*/
  }
  .movie-box .m-action-bg{
    background:linear-gradient(to right, rgba(255,124,65,1),rgba(255,52,8,1));
  }
  .movie-box .m-comedy-bg{
    background:linear-gradient(to right, rgba(255,105,160,1),rgba(255,46,100,1));
  }
  .movie-box .m-war-bg{
    background:linear-gradient(to right, rgba(255,126,106,1),rgba(255,28,12,1));
  }
  .movie-box > div{
    height:120px;
    display: inline-block;
    overflow: hidden;
  }
  .movie-box > div>img{
    width: 100%;
  }
  .m-box-one{
    width: 66.6%;
    background: #dddddd;
  }
  .m-box-other{
    width: 33.3%;
    background: #dddddd
  }
</style>
