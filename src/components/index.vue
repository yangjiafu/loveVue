<template>
  <div>
    <top></top>
    <router-view/>
    <bottom></bottom>
  </div>
</template>
<script>
  import Top from './layout/top.vue'
  import Bottom from './layout/bottom.vue'
  export default{
      components: {Bottom,Top},
      watch: {
        $route(to, from) {
          console.dir('to'+to.path);
          console.dir('from'+from.path);
        }
      }
  }
</script>
