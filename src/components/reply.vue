<template>
  <div>
    <div class="publish-top">
      <div class="cancel left" @click="$router.go(-1)">
        <span class="iconfont">&#xe617;</span>
      </div>
      <div class="title" style="display: block">
        <!--<span>发个信息</span>-->
        <span style="line-height: 40px">{{user.name}}</span>
      </div>
    </div>
    <div style="height: 40px"></div>
    <div class="hot-box">
      <div class="hot-top">
        <div class="hot-avatar left">
          <img src="/static/backgroud/bg3.jpg" alt="">
        </div>
        <p style="color: #ff5646;line-height: 1">{{commentInfo.name}}</p>
        <span style="color: #999;font-size: 12px">{{commentInfo.time}}</span>
      </div>
      <div class="hot-content">
        <p>{{commentInfo.comment}}</p>
        <!--<img :src="" alt="">-->
      </div>
    </div>
    <div class="publish-top" style="position: static;margin-bottom: 10px">
      <div class="cancel left" v-if="commentInfo.reply">
        <span>评论{{commentInfo.reply.length}}</span>
      </div>
      <div class="cancel right"
           :class="{'like-color':commentInfo.isLike}"
           @clike="doLikeComment">
        <!--<span>发个信息</span>-->
        <span style="line-height: 40px">
          {{commentInfo.like}}
        </span>
        <span class="iconfont">&#xeed2;</span>
      </div>
    </div>
    <div class="hot-box" style="border-bottom: 1px solid #eee;min-height: 80px"
         v-for="(item, index) in commentInfo.reply">
      <div class="hot-top">
        <div class="hot-avatar left">
          <img src="/static/backgroud/bg3.jpg" alt="">
        </div>
        <p style="color: #ff5646;line-height: 1">{{item.name}}</p>
        <div class="like-box right"
          @click="doLikeReply(item.id,item.replyId, index)"
          :class="{'like-color':item.isLike}"
        >
          {{item.like}}
          <span class="iconfont">&#xeed2;</span>
        </div>
      </div>
      <div class="hot-content">
        <p>{{item.reply}}</p>
      </div>
    </div>
    <div class="info-talk-bottom">
      <input type="text" class="input-style"
             style="width: 80%" placeholder="对{{}}说点什么吧">
      <div class="like-box right"
           style="width: 15%;font-size: 24px">
        <span class="iconfont">&#xe67c;</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
      data(){
          return {
            commentId:0,
            commentInfo:{}
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
              if(res.data!=='error'){
                _this.commentInfo = res.data
              }else {
                  alert('出错啦！')
              }
              console.log(res);
            }).catch(function (error) {
              console.log(error);
            })
        },
        doLikeComment(){
          let _this = this
          this.$http.post(this.url+'doHotLike',
            this.qs.stringify({
              type:'comment',
              u_id:this.user.id,
              comment_id:this.commentInfo.commentId
            })).then(function (res) {
            console.log(res);
            _this.commentInfo.isLike = !_this.commentInfo.isLike
            if(res.data=='sub'){
              _this.commentInfo.like -= 1
            }else{
              _this.commentInfo.like += 1
            }
          }).catch(function (error) {
            alert(error)
          })
        },
        doLikeReply(ruid,replyId,index){
            let _this = this
          this.$http.post(this.url+'doHotLike',
            this.qs.stringify({
              type:'reply',
              u_id:this.user.id,
              reply_id:replyId
            })).then(function (res) {
            console.log(res);
            _this.commentInfo.reply[index].isLike = !_this.commentInfo.reply[index].isLike
            if(res.data=='sub'){
              _this.commentInfo.reply[index].like -= 1
            }else{
              _this.commentInfo.reply[index].like += 1
            }
          }).catch(function (error) {
            alert(error)
          })
        }
    }
  }
</script>
