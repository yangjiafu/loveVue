<template>
  <div>
    <tabbar>
      <tabbar-item selected link="/">
        <img slot="icon" src="static/bottom/icon_nav_button.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/hot">
        <img slot="icon" src="static/bottom/icon_nav_msg.png">
        <span slot="label">热门</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <img slot="icon" src="static/bottom/icon_nav_article.png">
        <span slot="label">用户</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/news">
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
</style>
