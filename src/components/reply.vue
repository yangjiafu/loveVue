<template>
  <div>
    回复页面
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
      data(){
          return {
          commentId:0
        }
      },
      created:function () {
        this.commentId = this.$route.params.commentId
          if(this.commentId){
            this.getReply(0,10)
          }
      },
      computed:{
        ...mapState(['qs','user','url'])
      },
      methods:{
        getReply(start,limit){
            let _this = this
            this.$http.get(this.url+'getHotComment',{
              params:{
                type:'reply',
                hr_formId:_this.commentId,
                u_id:_this.user.id,
                limit:limit,
                start:start
              }
            }).then(function (res) {
              console.log(res);
            }).catch(function (error) {
              console.log(error);
            })
        }
    }
  }
</script>
