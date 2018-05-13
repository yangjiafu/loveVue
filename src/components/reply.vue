<template>
  <div style="padding-bottom: 40px">
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

        <div v-if="commentInfo.img.length>0"
             v-for="img in commentInfo.img"  class="img-box" >
          <img @click="plusImg(url+img,index)" :src="url+img" alt="">
        </div>

      </div>
    </div>

    <div id="box" v-show='bigImg' :class="{'bigImg': bigImg}" @click="plusImg(0)" >
      <img @click.stop="plusImg(0)" :src="plusPath" alt="">
    </div>

    <div class="publish-top" style="position: static;margin-bottom: 10px;padding: 0 10px">
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
          @click="doLikeReply(item.replyId, index)"
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
             v-model="replyContent"
             style="width: 80%" placeholder="对Ta说点什么吧...">
      <div class="like-box right"
           @click="commitReply"
           style="width: 15%;font-size: 24px">
        <span class="iconfont">&#xe67c;</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {Scroller } from 'vux'
  import {mapState} from 'vuex'
  export default{
      components:{
        Scroller
      },
      data(){
          return {
            commentId:0,
            commentInfo:{},
            replyContent:'',
            bigImg:false
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
        doLikeReply(replyId,index){
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
        },
        commitReply(){
            if(this.replyContent.length<1){
                alert('请输入内容')
                return
            }
          let _this = this
          this.$http.post(this.url+'commitHotReply',
            this.qs.stringify({
              hr_uid:this.user.id,
              hr_content:this.replyContent,
              hr_fromid:this.commentId
            })).then(function (res) {
            if(res.data!=='error'){
              _this.commentInfo.reply.unshift({'name':_this.user.name,'isLike':false,'like':0,
                'reply':_this.replyContent,'replyId': res.data.hr_id})
            }
          }).catch(function (error) {
            alert(error)
          })
        },
        plusImg(path,index){
          this.bigImg = !this.bigImg
          if(path){
            this.plusPath = path
            var box= document.getElementById("box");
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            box.style.paddingTop = t+100+"px";
            document.body.style.overflow='hidden';
          }else {
            document.body.style.overflow = 'scroll'
          }
        }
    }
  }
</script>
