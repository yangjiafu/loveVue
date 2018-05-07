<template>
  <div style="height: 100%;padding-top: 46px">
    <div v-transfer-dom>
      <actionsheet v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
    </div>
    <drawer
      width="250px;"
      :show.sync="showMenu"
      :drawer-style="{'background-color':'#fff', width: '70%',height:'100%',top:'0',position:'fixed'}"
    >
      <div slot="drawer">
        <x-icon @click="showMenu=!showMenu" slot="overwrite-left" type="navicon" size="35" style=""></x-icon>
        <p>侧边栏插槽</p>
        <br>
        <hr>
        <h1>侧边</h1>
        <button @click="clearUserInfo">退出登录</button>

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
  import {Actionsheet,Group,XSwitch,Drawer, TransferDomDirective as TransferDom  } from 'vux'
  import {mapMutations} from 'vuex'
  import Top from './layout/top.vue'
  import Bottom from './layout/bottom.vue'
  export default{
      directives: {
        TransferDom
      },
      components: {Bottom,Top,Actionsheet,Group,XSwitch,Drawer },

      data(){
          return{
            showMenu:false,
            drawerVisibility:false
          }
      },
      methods:{
        ...mapMutations(['setTitle','clearUsersInfo']),
        changeLocale(){
            this.showMenu = false
        },
        clearUserInfo(){
          this.clearUsersInfo()
          this.$router.push({name:'login'})
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
</style>
