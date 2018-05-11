<template>
  <div>
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <span>{{$store.state.title}}</span>
      <x-icon @click="$emit('refreshList')" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <span class="iconfont"
            style="position: absolute;right: 20px;font-size: 28px;transition: all .3s"
            @click="showBox = !showBox"
            :class="{'flipx':showBox}"
            >&#xe646;</span>
      <!--@click="goPublich"-->
      <div class="select-box" :class="{'show-select-box':showBox}">
        <div style="background-color: #10aeff;margin-bottom: 10px;" @click="goPublich('img')">
          发图片
        </div>
        <div style="background-color: #4b8bf4;" @click="goPublich('text')">
          发文字
        </div>
      </div>
      <div
        v-if="showBox"
        @click="showBox=!showBox"
        style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index: 1;background:rgba(0,0,0,.1)">

      </div>

      <!--<x-icon slot="right" type="ios-plus-empty" size="38"-->
              <!--style="fill:#fff;position:relative;top:-6px;left:-3px;font-weight: 700"></x-icon>-->
      <!--<x-icon @click="goSearch" slot="right" type="ios-search" size="30" style="fill:#fff;position:relative;top:-6px;left:-3px;"></x-icon>-->
      <!--<x-icon type="ios-search-strong" size="35"></x-icon>-->
    </x-header>

  </div>
</template>
<script>
  import {XHeader} from 'vux'
  export default {
    components: {
        XHeader
    },
    data(){
        return{
            showBox:false
        }
    },
    computed:{

    },
    mounted(){
        this.showPath()
    },
    methods:{
      goPublich(type){
         this.$router.push({name:'publishs',params:{'type':type}})
       },
      selectPublish(){

      },

       showPath(){
//           console.log('当前路由是')
      }
    }
  }
</script>
<style>
  .vux-x-icon {
    fill: #F70968;
  }
  .cell-x-icon {
    display: block;
    fill: green;
  }
  .select-box{
    position: fixed;
    right: 10px;
    top: 50px;
    /*width: 80px;*/
    /*height: 100px;*/
    /**/
    width: 0;
    height: 0;
    overflow: hidden;
    text-align: center;
    z-index: 3;
    transition: width .2s, height .3s;
    /*background: rgba(0,0,0,.3)*/
  }
  .show-select-box{
    width: 100px;
    height: 120px;
  }
  .select-box>div{
    width: 80px;
    height: 40px;
    margin: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 5px 20px #777;;
  }
 .flipx{
    transform: rotate(135deg);
  }
</style>
