<template>
  <div style="height: 100%;padding-top: 46px;">
    <div v-transfer-dom>
      <actionsheet v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <drawer
      width="250px;"
      :show.sync="showMenu"
      :drawer-style="{'background':'transparent', width: '70%',height:'100%',top:'0',position:'fixed'}"
    >
      <div slot="drawer" style="height: 100%;background: #f9f9f9">
        <!--<x-icon @click="showMenu=!showMenu" slot="overwrite-left" type="navicon" size="35" style=""></x-icon>-->
        <div class="header-box" >
          <br><br><br>
          <div class="cover-box">
            <img src="/static/backgroud/loginBkg.jpg" alt="">
          </div>
          <p style="color: #f9f9f9">{{user.name}}</p>
          <p style="color: #f9f9f9">{{user.email}}</p>

          <p v-if="leave" style="position: absolute;bottom:30px;left: 20px;text-align: center">
            <inline-loading></inline-loading>
          </p>
          <!--<div class="clear-button" @click="clearUserInfo">退出登录</div>-->
          <div class="clear-button" @click="clearCookie">
            <span class="iconfont" style="font-size: 30px">&#xe60d;</span>
            <!--退出-->
          </div>
          <!--<button @click="clearUserInfo">退出登录</button>-->
        </div>

      </div>
      <!--<div style="height: 46px"></div>-->
      <!--<button @click="drawerVisibility = true">侧边栏</button>-->
      <!--<button @click="showMenu=!showMenu">actionsheet</button>-->
      <router-view/>
    </drawer>
    <top @refreshList="showMenu=!showMenu"></top>
    <bottom></bottom>
  </div>
</template>
<script>
  import {Actionsheet,Group,XSwitch,Drawer, InlineLoading,TransferDomDirective as TransferDom  } from 'vux'
  import {mapMutations,mapState} from 'vuex'
  import Top from './layout/top.vue'
  import Bottom from './layout/bottom.vue'
  export default{
      directives: {
        TransferDom
      },
      components: {Bottom,Top,Actionsheet,Group,XSwitch,Drawer,InlineLoading },

      data(){
          return{
            showMenu:false,
            drawerVisibility:false,
            leave:false
          }
      },
      computed:{
        ...mapState(['user'])
      },
      methods:{
        ...mapMutations(['setTitle','clearUsersInfo','setCookie']),
        changeLocale(){
            this.showMenu = false
        },
//        clearUserInfo(){
//            var _this = this
//           this.leave = true
//           setTimeout(function () {
//             _this.clearUsersInfo()
//             _this.$router.push({name:'login'})
//            },500)
//        },
        clearCookie(){
          var _this = this
          this.leave = true
          _this.clearUsersInfo()
          this.setCookie({id:'',token:'',days:-1})
          setTimeout(function () {
            this.leave = false
            _this.$router.push({name:'login'})
          },500)
        }
      },
      watch: {
        $route(to, from) {
          this.setTitle(to.path)
          console.log(from.path)
//          console.dir('to'+to.path);
//          console.dir('from'+from.path);
        }
      }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  ul{
    list-style: none;
  }
  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  .router-view {
    width: 100%;
    top: 46px;
  }
  .vux-drawer-active, .vux-drawer-content{
    z-index: 1001!important;
  }
  /*.vux-pop-out-enter-active,*/
  /*.vux-pop-out-leave-active,*/
  /*.vux-pop-in-enter-active,*/
  /*.vux-pop-in-leave-active {*/
    /*will-change: transform;*/
    /*transition: all 200ms;*/
    /*height: 100%;*/
    /*!*top: 46px;*!*/
    /*top:0;*/
    /*position: absolute;*/
    /*backface-visibility: hidden;*/
    /*z-index: 1001;*/
    /*!*perspective: 1000;*!*/
  /*}*/
  /*.vux-pop-out-enter {*/
    /*opacity: 0;*/
    /*z-index: 1001;*/
    /*transform: translate3d(-100%, 0, 0);*/
  /*}*/
  /*.vux-pop-out-leave-active {*/
    /*opacity: 0;*/
    /*z-index: 1001;*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/
  /*.vux-pop-in-enter {*/
    /*opacity: 0;*/
    /*z-index: 1001;*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/
  /*.vux-pop-in-leave-active {*/
    /*opacity: 0;*/
    /*z-index: 1001;*/
    /*transform: translate3d(-100%, 0, 0);*/
  /*}*/

  .vux-drawer > .vux-drawer-content{
    transition: transform ease-in-out 0.34s, visibility 0.34s, -webkit-transform ease-in-out 0.34s!important;
    background: transparent;
  }
  .vux-header{
    /*background-color: #ff4324!important;*/
    /*background:-webkit-linear-gradient(ro right,#FF6740, #ff4324)!important;*/
    background:  -o-linear-gradient(left,#FF6740,#FF6740, #ff4324, #ff4324);
    background:  -moz-linear-gradient(left,#FF6740,#FF6740, #ff4324, #ff4324);
    background:  -ms-linear-gradient(left,#FF6740,#FF6740, #ff4324, #ff4324);
    background: -webkit-linear-gradient(left,#FF6740,#FF6740, #ff4324, #ff4324)!important;

  }
  .vux-drawer > .vux-drawer-body > .drawer-mask{
    background-color: rgba(255,255,255,0)!important;
  }
  .header-box{
    width: 100%;
    height: 100%;
    padding-left: 30px;
    text-align: left;
    background: url('/static/backgroud/bg3.jpg') no-repeat;
    position: relative;
  }
  .cover-box{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .cover-box img{
    width: 100%;
  }
  .clear-button{
    width: 50px;
    height:50px;
    position: absolute;
    right: 30px;
    bottom: 10px;
    /*line-height: 30px;*/
    /*text-align: center;*/
    color: #eee;
    /*border: 1px solid #aaa;*/
    /*background: #999;*/
    /*border-radius: 20px;*/
    box-shadow: 0px 5px 25px #000;
  }
</style>
