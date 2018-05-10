<template>
  <div style="padding-bottom: 10px;height: 40px;">
    <tabbar>
      <tabbar-item  :selected="$store.state.title == '首页'" link="/">
        <!--<img slot="icon" src="static/bottom/home.png">-->
        <span slot="icon" class="iconfont font">&#xe607;</span>
        <!--<span slot="label">home</span>-->
      </tabbar-item>
      <tabbar-item :selected="$store.state.title == '热门'" link="/hot">
        <!--<img slot="icon" src="static/bottom/icon_nav_msg.png">-->
        <span slot="icon"  class="iconfont font">&#xe619;</span>
        <!--<span slot="label">hot</span>-->
      </tabbar-item>
      <!--<tabbar-item  :selected="$store.state.title == '用户'" link="/user">-->
        <!--&lt;!&ndash;<img slot="icon" src="static/bottom/icon_nav_article.png">&ndash;&gt;-->
        <!--<span slot="label">用户</span>-->
      <!--</tabbar-item>-->
      <tabbar-item  :selected="$store.state.title == '搜索'" link="/search">
        <!--<img slot="icon" src="static/bottom/icon_nav_cell.png">-->
        <span slot="icon" class="iconfont font">&#xe669;</span>
        <!--<span slot="label">search</span>-->
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>
<style>
/*.weui-tabbar{*/
  /*left: 0!important;*/
/*}*/
.weui-tabbar{
  height: 48px!important;
  bottom: -1px!important;
}
.weui-tabbar__item{
  padding: 0!important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #ff4324 !important;
}
  .font{
    /*display: inline-block;*/
    /*width: 30px;*/
    /*height: 30px;*/
    font-size: 28px;
    /*margin-bottom: 5px;*/
  }
</style>
