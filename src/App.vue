<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <loading v-model="isLoading"></loading>
    <!--<transition name="fade">-->
      <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import routes from './router'
  import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'
export default {
  name: 'App',
  components:{
    Loading,
  },
  data(){
    return{
      loadInfo:false
    }
  },
  computed:{
    ...mapState({
      isLoading:state => state.isLoading
    }),
    ...mapGetters(['getUserInfo'])
  },
  mounted(){
//    this.judgmentInfo()
  },
  methods:{
    ...mapMutations(['updateLoadingStatus']),
      judgmentInfo(){
//        this.updateLoadingStatus(true)
//        console.log('default...');
//        setTimeout(()=>{
//          this.updateLoadingStatus(false)
//        },1000)

//        setTimeout(()=>{
//          routes.push({name:'home'})
//        },1000)
//          if(this.loadInfo){
//            routes.push({name:'home'})
//          }else {
//              routes.push({name:'login'})
//          }
      }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0!important;
    height:100%;
  }
  .fade-enter-active, .fade-leave-active {
    /*height:0;*/
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    /*height:0;*/
    opacity: 0
  }
</style>
