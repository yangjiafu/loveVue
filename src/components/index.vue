<template>
  <div>
    <p>顶部</p>
    <router-view/>
    <bottom></bottom>
  </div>
</template>
<script>
  import Bottom from './layout/bottom.vue'
  export default{
      components: {Bottom}
  }
</script>
