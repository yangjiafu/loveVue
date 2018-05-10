<template>
  <div>
    <div class="hot-box">
      <div class="hot-top">
        <div class="hot-avatar left">
          <img src="/static/backgroud/bg3.jpg" alt="">
        </div>
        <p style="color: #ff5646;line-height: 1">a哈哈哈三</p>
        <span style="color: #999;font-size: 12px">12点前</span>
      </div>
      <div class="hot-content">
        <p>元素的内边距在边框和内容区之间。控制该区域最简单的属性是 padding 属性。 CSS padding 属性定义元素边框与元素内容之间的空白区域</p>
      </div>
      <div class="hot-bottom">
        <div class="hot-icon like">30<span class="iconfont">&#xe612;</span></div>
        <div class="hot-icon like">15<span class="iconfont">&#xeed2;</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hot',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{

    }
  }
</script>
<style>
  .hot-box{
    width: 100%;
    min-height: 130px;
    text-align: left;
  }
  .hot-top{
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    padding: 10px;
  }
 .hot-avatar{
    width: 40px;
    height:40px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  .hot-avatar>img{
    width: 100%;
  }
  .hot-content{
    min-height: 20px;
    width: 100%;
    padding: 10px;
    color: #111;
    line-height: 1.1em;
    box-sizing: border-box;
  }
  .hot-bottom{
    height: 30px;
    width: 95%;
    margin: auto;
    text-align: right;
    border-top: 1px solid #ddd;
  }
  .hot-icon{
    width: 40px;
    height: 30px;
    margin-right: 20px;
    display: inline-block;
  }
</style>
