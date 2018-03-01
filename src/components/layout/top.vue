<template>
  <div>
    <x-header slot="header" style="position: absolute;top: 0;left: 0;width: 100%" >
      <span>title</span>
      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
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
      title () {
//        console.log('当前 route'+this.route.path)
        if (this.route.path === '/') return 'home'
        if (this.route.path === '/hot') return 'hot'
        if (this.route.path === '/news') return 'news'
        else return 'user'
//        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      },
    },
    mounted(){
        this.showPath()
    },
    methods:{
       showPath(){
           console.log('当前路由是')
      }
    }
  }
</script>
