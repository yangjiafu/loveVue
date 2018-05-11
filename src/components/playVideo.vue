<template>
  <div>
    <div class="go-back" @click="goBackSearch" v-show="goBackBox" >
      <span class="iconfont" style="line-height: 40px;font-size: 24px;">&#xe617;</span>
    </div>
    <video @click="showGoBack" style="width: 100%" v-if="v_arr.length>0" controls :src="v_arr[0].link1"></video>
    <div style="width: 100%;height: 200px" v-if="v_arr.length<1"><h2>数据出错了</h2></div>
    <div class="info-title-box">
      <div class="title-bottom left">
        <p>{{m_info.name}}</p>
        <span style="font-size: 8px;color: #ccc">豆瓣{{m_info.score}}</span>
      </div>
      <div class="title-bottom right" style="width: 20%">
        <div class="like-box left" @click="isLike(1)">
          <p class="iconfont" :class="{'like-color':m_info.islike}">&#xeed2;</p>
          <span style="font-size: 8px;color: #ccc">{{m_info.like}}</span>
        </div>
        <!--<div class="like-box right" @click="isLike(0)">-->
          <!--<p class="iconfont">&#xe672;</p>-->
          <!--<span style="font-size: 8px;color: #ccc">{{m_info.dislike}}</span>-->
        <!--</div>-->
      </div>
      <!--{{m_info.islike}}-->
    </div>
    <div class="info-talk-box">
      <div class="talk-input-box">
        <div class="user-cover left">
          <img src="/static/backgroud/loginBkg.jpg" alt="">
        </div>
        <input class="input-style" maxlength="150" placeholder="说点什么吧" type="text" v-model="in_comment.movie">
        <div class="right" style="width: 40px;display: inline-block;height: 30px" @click="commitContent">
          <span class="iconfont" style="font-size: 22px">&#xe67c;</span>
        </div>
      </div>
      <div class="comment-box" v-if="out_comment.length>0" v-for="(item, index) in out_comment">
        <div class="comment-top">
          <div class="user-cover left">
            <img :src="item.form_avatar" alt="">
          </div>
          <span style="color: #ff5646">{{item.form_name}}</span>
          <div class="like-box right" @click="">
            <p class="iconfont" >&#xeed2;</p>
            <span style="font-size: 8px;color: #ccc"></span>
          </div>
        </div>
        <div class="comment-content">
          <p>{{item.content}}</p>
        </div>
        <div class="like-box right" @click="showInputBox(item.form_name,item.form_uid,item.c_id)">
          <span class="iconfont">&#xe612;</span>
        </div>
        <div class="like-box right"
             :class="{'flipx':!item.show_reply}"
             v-if="item.reply.length>0"
             @click="item.show_reply=!item.show_reply">
          <span>{{item.reply.length}}</span>
          <span class="iconfont" >&#xe64d;</span>
        </div>
        <div v-show="item.reply.length>0" class="reply-box hidden-reply" :class="{'show-reply':!item.show_reply}">
          <div class="reply-u" v-for="res in item.reply">
              <span style="color: #83ADFF">{{res.r_name}}:</span>
              <span>{{res.r_content}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info-talk-bottom" v-if="showInBox">
      <input type="text" class="input-style"
             style="width: 80%"
             :placeholder="commentBoxName"
              v-model="in_comment.user">
      <div class="like-box right"
           style="width: 15%;font-size: 24px"
          @click="commitUComent">
        <span class="iconfont">&#xe67c;</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default{
      data(){
          return{
              src:'http://localhost:8011/%E5%AE%B6%E5%9B%AD_bd.mp4',
              m_info:[], //电影的所有信息内容
              v_info:'', //linkInfo内的所有信息
              v_arr:[],//每一种电影播放格式的数组
              in_comment:{
                  movie:'',
                  user:'',
                  replyId:'',
                  form_uid:''
              },//用户评论电影的输入数据
              out_comment:[],
              showInBox:false,
              showReply:-1,
              commentBoxName:'',
              goBackBox:false
          }
      },
      computed:{
          ...mapState(['url','qs','user']),
          ...mapGetters(['get_m_o_Info'])
      },
      created:function () {
          this.filterMovieInfo(this.$route.params.m_id);
          this.getLinkData();
          this.getComment();
          let _this = this
          this.goBackBox =! this.goBackBox
          setTimeout(function () {
            _this.goBackBox =! _this.goBackBox
          },3000)
      },
      methods:{
          ...mapMutations(['filterMovieInfo']),
          getLinkData(){
            this.m_info = this.get_m_o_Info;
            let m_info_linkInfo = this.m_info.linkInfo.split('[&');
//        let m_info_linkInfo = this.m_data.split('[&');
            for(let i in m_info_linkInfo){
              let current = m_info_linkInfo[i].split('<<');
              let v_obj = {format:current[0],capacity:current[1],link1:current[2],link2:current[3]};
              if(v_obj.link1.search('http://') !==-1 || v_obj.link2.search('http://') !==-1){
                if(v_obj.link2.search('http://') !==-1){
                  let link = v_obj.link2
                  v_obj.link2 = v_obj.link1
                  v_obj.link1 = link
                }
                this.v_arr.push(v_obj)
              }else {

              }
            }
            console.log(this.v_arr);
          },
          isLike(type){
              var _this = this
            this.$http.post(this.url+'goMovieLike',
            this.qs.stringify({
              'm_id':_this.m_info.id,
              'u_id':_this.user.id
            })).then(function (res) {
                if(res.data=='add'){
//                  console.log('点赞成功');
                  _this.m_info.islike = 1
                  _this.m_info.like += 1
                }else if(res.data=='sub'){
//                    console.log('取消点赞')
                  _this.m_info.islike = 0
                  _this.m_info.like -= 1
                }else {
                  console.log('出错了');
                }
            }).catch(function (error) {
                alert(error)
            })
          },
          commitContent(){
              var _this = this
            if(this.in_comment.movie.length<1){
                alert('提交字符太少');
            }else {
                this.$http.post(this.url+'commitComment',
                this.qs.stringify({
                  'type':'comment',
                  'form_id': _this.user.id,
                  'topic_id': _this.m_info.id,
                  'content': _this.in_comment.movie
                })
                ).then(function (res) {
                    if(res.data=='success'){
                        _this.getComment()
                    }
                  console.log(res);
                }).catch(function (error) {
                  console.log(error);
                })
            }
          },
          getComment(){
              var _this = this
              this.$http.get(this.url+'getComment',
                {
                    params:{
                        m_id:_this.m_info.id
                    }
                }).then(function (res) {
                console.log('获取了电影的评论',res);
                _this.out_comment = res.data
              }).catch(function (error) {
                alert(error)
              })
          },
          showInputBox(name,form_uid,cid){
            console.log('点击了'+name);
            this.showInBox = true;
            this.commentBoxName = '回复'+name
            this.in_comment.form_uid = form_uid
            this.in_comment.replyId = cid
          },
          commitUComent(){
              var _this = this
              if(this.in_comment.user.length<1){
                  alert('请正确填写')
              }else {
                  this.$http.post(this.url+'commitComment',
                  this.qs.stringify({
                    'type':'reply',
                    'reply_id': _this.in_comment.replyId,
                    'content': _this.in_comment.user,
                    'form_uid': _this.user.id
                  })
                  ).then(function (res) {
                    console.log('提交评论用户成功'+res);
                    if(res.data=='success'){
                      _this.getComment()
                    }
                  }).catch(function (error) {
                    alert(error)
                  })
              }
          },
          showCReply(index){
              this.showReply = index
          },
          showGoBack(){
              let _this = this
              this.goBackBox =! this.goBackBox
              setTimeout(function () {
                _this.goBackBox =! _this.goBackBox
              },4000)
          },
          after(){
            this.$router.go(-1)
          },
          goBackSearch(){
            console.log('回去');
            this.$router.go(-1)
          }
      }
  }

</script>
<style>
  .info-title-box{
    width: 100%;
    height: 40px;
  }
  .title-bottom{
    width: 35%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    line-height:1.2;
    text-align: left;
    font-size: 16px;
    display: inline-block;
  }
  .right{
    float: right;
  }
  .left{
    float: left;
  }
  .like-box{
    width: 30px;
    height:100%;
    transition: all .3s;
    /*text-align: center;*/
  }
  .like-color{
    color: #FF4609;
  }
  .info-talk-box{
    width: 100%;
    min-height:500px;
  }
  .talk-input-box{
    width: 92%;
    height:30px;
    text-align: left;
    padding: 10px 20px;
    vertical-align: middle;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .user-cover{
    /*margin: 5px;*/
    height:30px;
    width: 30px;
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
  }
  .user-cover img{
    width: 100%;
  }
  .input-style{
    width: 65%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #888;
    padding-left: 10px;
    border: none;
  }
  .info-talk-bottom{
    position: fixed;
    bottom: 0;
    height:30px;
    width: 100%;
    text-align: left;
    padding: 5px 10px;
    background-color: #f0f0f0;
  }
  .comment-box{
    width: 90%;
    padding: 5px 20px;
    min-height: 80px;
    text-align: left;
    overflow-y: scroll;
    border-bottom: 1px solid #eee;
  }
  .comment-top{
    width: 100%;
    height:30px;
    /*text-align: left;*/
  }
  .comment-content{
    width: 90%;
    min-height:20px;
    overflow: auto;
  }
  .comment-content p{
    /*text-overflow: ellipsis!important;*/
    text-indent: 2em;
    color: #111;
    word-wrap: break-word;
    line-height: 1;
    min-height: 20px;
  }
  .reply-box{
    width: 90%;
    height:auto;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  .reply-u{
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 14px;
  }
  .hidden-reply{
    width: 0;
    height: 0;
    overflow: hidden;
    transition: height .3s;
  }
  .show-reply{
    width: 90%;
    height:auto;
  }
  .flipx{
    transform: rotate(90deg);
  }
  .go-back{
    position: absolute;
    width: 50px;
    height: 40px;
    display: inline-block;
    top: 0;
    left: 0;
    z-index: 2;
    transition: all .3s;
    /*background: rgba(0,0,0,.3);*/
  }
</style>
