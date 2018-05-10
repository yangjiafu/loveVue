<template>
  <div>
    <div class="hot-box" v-for="item in commentInfo" @click="goHotReply(item.commentId)">
      <div class="hot-top">
        <div class="hot-avatar left">
          <img src="/static/backgroud/bg3.jpg" alt="">
        </div>
        <p style="color: #ff5646;line-height: 1">{{item.name}}</p>
        <span style="color: #999;font-size: 12px">{{item.time}}</span>
      </div>
      <div class="hot-content">
        <p>{{item.comment}}</p>
      </div>
      <div class="hot-bottom">
        <div class="hot-icon like" @click="goHotReply(item.commentId)">
          {{item.replays}}
          <span class="iconfont">&#xe612;</span>
        </div>
        <div class="hot-icon like" @click="doLike(item.commentId)">
          {{item.like}}
          <span class="iconfont">&#xeed2;</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'hot',
    data () {
      return {
        commentInfo:[]
      }
    },
    computed:{
      ...mapState(['url','user','qs'])
    },
    created:function () {
      this.getComment(10,0)
    },
    methods:{
      getComment(limit,start){
          let _this = this
          this.$http.get(this.url+'getHotComment',{
              params:{
                type:'comment',
                u_id:_this.user.id,
                limit:limit,
                start:start
              }
          }).then(function (res) {
            console.log(res);
            if(res.data.length>0)
              _this.commentInfo=res.data;
            else
                alert('database error')
          }).catch(function (error) {
            console.log(error);
          })
      },
      doLike(commentId){
          this.$http.post(this.url+'doHotLike',
          this.qs.stringify({
            type:'comment',
            u_id:this.user.id,
            comment_id:commentId
          })).then(function (res) {
            console.log(res);
          }).catch(function (error) {
            alert(error)
          })
      },
      goHotReply(id){
//        console.log(id);
//          this.$router.push({'name':'reply',params:{commentId:id}})
      }
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
