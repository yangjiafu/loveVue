<template>
  <div>
    <tabbar>
      <tabbar-item  :selected="$store.state.title == '首页'" link="/">
        <img slot="icon" src="static/bottom/icon_nav_button.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot  :selected="$store.state.title == '热门'" link="/hot">
        <img slot="icon" src="static/bottom/icon_nav_msg.png">
        <span slot="label">热门</span>
      </tabbar-item>
      <tabbar-item  :selected="$store.state.title == '用户'" link="/user">
        <img slot="icon" src="static/bottom/icon_nav_article.png">
        <span slot="label">用户</span>
      </tabbar-item>
      <tabbar-item badge="2"  :selected="$store.state.title == '新闻'" link="/news">
        <img slot="icon" src="static/bottom/icon_nav_cell.png">
        <span slot="label">新闻</span>
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
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #ff4324 !important;
}
</style>
