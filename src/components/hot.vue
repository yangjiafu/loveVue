<template>
  <div>

    <div class="hot-box" v-for="(item, index) in commentInfo">
      <div class="hot-top">
        <div class="hot-avatar left">
          <img src="/static/backgroud/bg3.jpg" alt="">
        </div>
        <p style="color: #ff5646;line-height: 1">{{item.name}}</p>
        <span style="color: #999;font-size: 12px">{{item.time}}</span>
      </div>
      <div class="hot-content">
        <p>{{item.comment}}</p>
        <div v-if="item.img.length>0"
             v-for="img in item.img"  class="img-box" >
          <img @click="plusImg(url+img,index)" :src="url+img" alt="">
        </div>
      </div>
      <div class="hot-bottom">
        <div class="hot-icon like" @click="goHotReply(item.commentId)">
          {{item.replays}}
          <span class="iconfont">&#xe612;</span>
        </div>
        <div class="hot-icon like":class="{'like-color':item.isLike}"
             @click="doLike(item.commentId,index)">
          {{item.like}}
          <span class="iconfont">&#xeed2;</span>
        </div>
      </div>
    </div>
    <div id="box" v-show='bigImg' :class="{'bigImg': bigImg}" @click="plusImg(0)" >
      <img @click.stop="plusImg(0)" :src="plusPath" alt="">
    </div>

  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import Scroll from './scroller/v-scroll.vue'
  export default {
    name: 'hot',
//    components:{Scroll},
    data () {
      return {
        commentInfo:[],
        bigImg:false,
        plusPath:''
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
      doLike(commentId,index){
        let _this = this
          this.$http.post(this.url+'doHotLike',
          this.qs.stringify({
            type:'comment',
            u_id:this.user.id,
            comment_id:commentId
          })).then(function (res) {
            console.log(res);
            _this.commentInfo[index].isLike = !_this.commentInfo[index].isLike
            if(res.data=='sub'){
              _this.commentInfo[index].like -= 1
            }else{
              _this.commentInfo[index].like += 1
            }
          }).catch(function (error) {
            alert(error)
          })
      },
      goHotReply(id){
        console.log(id);
          this.$router.push({'name':'reply',params:{commentId:id}})
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
<style>
  /*.hot-box{*/
    /*width: 100%;*/
    /*min-height: 130px;*/
    /*text-align: left;*/
  /*}*/
  /*.hot-top{*/
    /*width: 100%;*/
    /*height: 45px;*/
    /*box-sizing: border-box;*/
    /*padding: 10px;*/
  /*}*/
 /*.hot-avatar{*/
    /*width: 40px;*/
    /*height:40px;*/
    /*display: inline-block;*/
    /*border-radius: 50%;*/
    /*overflow: hidden;*/
    /*margin-right: 10px;*/
  /*}*/
  /*.hot-avatar>img{*/
    /*width: 100%;*/
  /*}*/
  /*.hot-content{*/
    /*min-height: 20px;*/
    /*width: 100%;*/
    /*padding: 10px;*/
    /*color: #111;*/
    /*line-height: 1.1em;*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.img-box{*/
    /*width: 33.3%;*/
    /*height: 80px;*/
    /*display: inline-block;*/
    /*overflow: hidden;*/
  /*}*/
  /*.img-box>img{*/
    /*width: 100%;*/
  /*}*/
  /*.bigImg{*/
    /*position: fixed!important;*/
    /*background:rgba(0,0,0,.4);*/
    /*top: 0 ;*/
    /*left:0;*/
    /*bottom: 0;*/
    /*z-index: 9999;*/
    /*padding-top: 40px;*/
    /*width: 100%;*/
    /*height:100%;*/
    /*transition: all .3s;*/
    /*text-align: center;*/
    /*overflow: auto;*/
  /*}*/
  /*.bigImg>img{*/
    /*width: auto;*/
    /*max-width: 90%;*/
    /*margin: auto;*/
  /*}*/

  /*.hot-bottom{*/
    /*height: 30px;*/
    /*width: 95%;*/
    /*margin: auto;*/
    /*text-align: right;*/
    /*border-bottom: 1px solid #ddd;*/
  /*}*/
  /*.hot-icon{*/
    /*width: 40px;*/
    /*height: 30px;*/
    /*margin-right: 20px;*/
    /*display: inline-block;*/
  /*}*/
  /*.like-color{*/
    /*color: #FF4609;*/
  /*}*/
  /*.info-talk-bottom{*/
    /*position: fixed;*/
    /*bottom: -2px;*/
    /*height:30px;*/
    /*width: 100%;*/
    /*text-align: left;*/
    /*padding: 5px 10px;*/
    /*background-color: #f0f0f0;*/
  /*}*/
  /*.input-style{*/
    /*width: 65%;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*font-size: 14px;*/
    /*color: #888;*/
    /*padding-left: 10px;*/
    /*border: none;*/
  /*}*/
</style>
