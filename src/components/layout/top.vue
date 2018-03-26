<template>
  <div>
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%;z-index: 1000" >
      <span>{{$store.state.title}}</span>
      <x-icon @click="$emit('refreshList')" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <x-icon @click="goSearch" slot="right" type="ios-search" size="30" style="fill:#fff;position:relative;top:-6px;left:-3px;"></x-icon>
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
    computed:{

    },
    mounted(){
        this.showPath()
    },
    methods:{
       goSearch(){
         console.log('gosearch');
         this.$router.push({name:'search'})
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
</style>
