<template>
  <div style="height: 100%;padding-bottom: 54px">
    <p>home</p>
    <br><br>
    <br><br>
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
    <!--<img src="./assets/logo.png">-->

    <!--<router-view/>-->
    <!--<div>-->
      <!--<ul>-->
        <!--<li @click="goHome">-->
          <!--首页-->
        <!--</li>-->
        <!--<li @click="goHot">-->
          <!--热门页-->
        <!--</li>-->
        <!--<li @click="goUser">-->
          <!--用户-->
        <!--</li>-->
      <!--</ul>-->
      <!--{{$store.state.count}}-->
      <!--<button @click="$store.commit('add')">+</button>-->
      <!--{{$store.state.name}},{{ getUserInfo }}-->
      <!--&lt;!&ndash;<button @click="$store.commit('setUserInfo',{names:'yang'})">&ndash;&gt;-->
      <!--<button @click="setCookie()">-->
        <!--存储用户信息在cookie-->
      <!--</button>-->
      <!--<button @click="cheakUserInfo">检查cookie</button>-->
      <!--{{cookie}}-->
    <!--</div>-->
  </div>
</template>

<script>
//  import { Group, Cell } from 'vux'
//  import routes from './router'
//  import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'
  export default {
    name: 'home',
//    components:{
////      Group,
////      Cell
//    },
    data(){
      return{
        cookie:'',
        userInfo:{
          name:'杨',
          token:'12321asd',
          pwd:'123'
        }
      }
    },
//    computed:{
//      ...mapGetters(['getUserInfo'])
//    },
//    mounted(){
//      this.init()
//    },
    methods:{
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
      goHot:()=>{
        console.log('goHot')
        routes.push({name:'hot'})
        console.log('goHot')
        //this.$router.push({path:'/hot'})
      },
      goUser:()=>{
        console.log('goUser');
        routes.push({name:'user'})
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

</style>
