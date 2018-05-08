<template>
  <div style="height: 100%;padding-bottom: 54px">
    <swiper height="150px" :aspect-ratio="300/800" auto loop v-model="swiperItemIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in newMovie" :key="index" >
        <img :src="item.cover" @click="goMovieInfo(item.id)">
        <p class="movie-title">{{item.name}}</p>
      </swiper-item>
    </swiper>
    <br><br>
    <br><br>
    <button @click="setCookieUser">写入cookie</button>
    <button @click="getCookieUser">读取cookie</button>
    <button @click="clearCookieUser">清除cookie</button>
    <br><br>
    <br><br>

    <br><br>
    <button @click="cos">home</button>
    <h1>home</h1>
    <h1>home</h1>
    <!--<button @click="">axios测试</button>-->
    <h1>home</h1>
    <br>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
    <h1>home</h1>
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
        cookie:'',
        userInfo:{
          name:'杨',
          token:'12321asd',
          pwd:'123'
        },
        swiperItemIndex:1,
        newMovie:[]
      }
    },
    created:function () {
      var _this = this
      _this.$http.get('http://localhost:8000/'+'getNewMovie',{
          params:{
            place:'home',
            limit:3
          }
        }
      ).then(function (res) {
        for(var m in res.data){
            var obj ={}
            obj.name=res.data[m].name
            obj.score=res.data[m].score
            obj.cover=res.data[m].cover
            obj.id=res.data[m].id
          _this.newMovie.push(obj)
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    methods:{
      ...mapMutations(['setCookie','getCookie']),
      cos(){
        console.log('home点击');
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
      goMovieInfo(index){
        console.log(index)
        this.$router.push({name:'search',query:{id:index}})
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
</style>
