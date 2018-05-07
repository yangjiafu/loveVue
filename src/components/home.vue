<template>
  <div style="height: 100%;padding-bottom: 54px">
    <swiper height="150px" :aspect-ratio="300/800" auto loop  v-model="swiperItemIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index" >
        <img :src="item" @click="goMovieInfo(index)">
        <p>current index: {{index}}</p>
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
  export default {
    name: 'home',
    components:{
      Swiper, SwiperItem
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
        demo04_list:[
          'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
        ]
      }
    },
//    computed:{
//      ...mapGetters(['getUserInfo'])
//    },
//    mounted(){
//      this.init()
//    },
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
      },
      setCookieUser(){
          this.setCookie({u_id:'12',u_token:'asfdawer234awefdsfwe',u_days:7})
      },
      getCookieUser(){
          var o = this.getCookie()
        console.log(0);
      },
      clearCookieUser(){
        this.setCookie({u_id:'',u_token:'',u_days:-1});
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
</style>
