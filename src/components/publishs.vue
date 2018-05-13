<template>
  <div>
    <div class="publish-top">
      <div class="cancel left" @click="goBack">取消</div>
      <div class="title">
        <!--<span>发个信息</span>-->
        <span style="line-height: 40px">yousername</span>
      </div>
      <div class="commit-button right"
           :class="{'permit-commit':(comment.length>0&&type=='text' )|| fileLength>0}"
           @click="commitComment">发布</div>
    </div>
    <div class="publish-body" v-if="type=='text'">
      <textarea placeholder="分享些什么吧..." v-model="comment" name=""cols="30" rows="10">
      </textarea>
    </div>
    <div class="publish-body" v-if="type=='img'">
      <form id="commentFile" style="min-height: 80px" name="commentFile" enctype="multipart/form-data">
        <input type="text" name="commentUId" v-model="user.id" style="width: 0;height: 0;overflow: hidden">
        <textarea placeholder="分享些什么吧..." v-model="comment" type="text" name="commentText" cols="30" rows="10">
          </textarea>
        <div  class="select-button" v-show="fileLength>0" @click="clearSelect">取消选择</div>
        <div class="select-button" id="imgSelectFile" v-show="fileLength<1">
          <div>添加图片</div>
           <input id="filed" type="file" name="commentImg" accept="image/*"
               multiple="multiple" @change="selectImg()" /></div>
            <p style="color: #ddd;font-size: 12px;float: left;margin-left: 10px;margin-top: 20px">最多可选9张</p>
      </form>
      <div id="imgBox"></div>
    </div>
    <div :class="{'commit-prompt':isPublish}">
      <div v-show="is_success">
        <span class="iconfont " style="font-size: 30px">&#xe6b8;</span>
        <p style="color: #fff">发布成功</p>
      </div>
      <div v-show="is_error">
        <span class="iconfont " style="font-size: 30px">&#xe6b8;</span>
        <p style="color: #fff">发布失败</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
      data(){
          return{
              comment:'',
              isPublish:false,
              is_success:false,
              is_error:false,
              type:'',
              fileLength:0
          }
      },
      computed:{
          ...mapState(['url','qs','user'])
      },
      created:function(){
          this.type = this.$route.params.type
      },
      methods:{
            goBack(){
              this.$router.go(-1)
            },
            commitStatus(res){
                let _this = this
              setTimeout(function () {
                _this.is_success=false;
                _this.is_error=false;
                _this.isPublish=false
              },3000);
              this.isPublish=true
              if(res.data=='success'){
                this.is_success=true
              }else {
                this.is_error=true
              }
            },
            commitComment(){
                let _this = this
              if(this.type=='text'){
                this.$http.post(_this.url+'commitHotComment',
                  _this.qs.stringify({
                    type:'comment',
                    h_uid:_this.user.id,
                    h_comment: _this.comment,
                  })
                ).then(function (res) {
                  _this.commitStatus(res)
                }).catch(function (error) {
                  alter(error);
                })
              }else {
                let form = document.getElementById('commentFile')
                let fd = new FormData(form)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                this.$http.post(_this.url+'commitHotFile',fd, config)
                .then(function (res) {
                  console.log(res);
                  _this.commitStatus(res)
                }).catch(function (error) {
                  console.log(error)
                })
              }

            },
            selectImg(){
              var fil = event.target.files;
              this.fileLength = fil.length
              if(fil.length>9){
                  this.fileLength = 0
                  this.clearSelect()
                  alert('选择图片超过规定个数将被释放，请重新选择！')
              }
              else {
                for (var i=0;i<fil.length;i++) {
//                console.log(fil[i]);
//                console.log('--------------------------');
                  this.reads(fil[i]);
                }
              }

            },
            reads(fil){
              var reader = new FileReader();
              reader.readAsDataURL(fil);
              reader.onload = function(){
                 document.getElementById("imgBox").innerHTML +=
                   "<div><img src='"+reader.result+"'></div>";
  //              $('#inputs').after("<img src='"+reader.result+"'>");
              };
            },
            clearSelect(){
              let obj =document.getElementById('filed');
              obj.outerHTML = obj.outerHTML
              document.getElementById("imgBox").innerHTML=''
              this.fileLength = 0
            }
      }
  }
</script>
<style>
  /*.publish-top{*/
    /*position: fixed;*/
    /*height: 40px;*/
    /*width: 100%;*/
    /*background-color: #F9F9FA;*/
    /*border-bottom: 1px solid #E5E5E5;*/
    /*color: #111;*/
    /*text-align: center;*/
  /*}*/
  /*.cancel{*/
    /*width: 50px;*/
    /*height: 100%;*/
    /*display: inline-block;*/
    /*line-height: 40px;*/
  /*}*/
  /*.title{*/
    /*height: 100%;*/
    /*width: 100px;*/
    /*margin: auto;*/
    /*display: inline-block;*/
  /*}*/
  /*.commit-button{*/
    /*width: 50px;*/
    /*height: 30px;*/
    /*color: #ccc;*/
    /*display: inline-block;*/
    /*line-height: 30px;*/
    /*margin: 5px 20px;*/
    /*border: 1px solid #ddd;*/
    /*box-sizing: content-box;*/
    /*border-radius: 2px;*/
  /*}*/
  /*.publish-body{*/
    /*width: 100%;*/
    /*height: auto;*/
    /*padding-top: 40px;*/
  /*}*/
  /*.publish-body textarea{*/
    /*width: 90%;*/
    /*height: auto;*/
    /*border: hidden;*/
    /*margin: 20px;*/
    /*box-sizing: content-box;*/
  /*}*/
  /*textarea:focus{*/
    /*outline: none;*/
  /*}*/
  /*.permit-commit{*/
    /*background-color: #FF6B38;*/
    /*border-radius: 2px;*/
    /*border: none;*/
    /*color: #fff;*/
  /*}*/
  /*.commit-prompt{*/
    /*position: absolute;*/
    /*width: 80px;*/
    /*height: 80px;*/
    /*margin: auto;*/
    /*top: 100px!important;*/
    /*left:0!important;*/
    /*right: 0!important;*/
    /*color: #FF6B38;*/
    /*background: rgba(0,0,0,0.1);*/
    /*transition: all .2s;*/
    /*border-radius: 5px;*/
    /*!*background: #cccccc*!*/
  /*}*/
  /*#imgBox{*/
    /*width: 100%;*/
    /*height: 300px;*/
    /*margin-top: 80px;*/
  /*}*/
  /*#imgBox>div{*/
    /*width: 33.3%;*/
    /*height: 100px;*/
    /*overflow: hidden;*/
    /*display: inline-block;*/
    /*float: left;*/
  /*}*/
  /*#imgBox>div>img{*/
    /*width: 100%;*/
  /*}*/
  /*.select-button{*/
    /*padding: 4px 10px;*/
    /*position: relative;*/
    /*float: left;*/
    /*margin-left: 20px;*/
    /*line-height: 20px;*/
    /*display: inline-block;*/
    /*border: 1px solid #e5e5e5;*/
    /*color: #ccc;*/
    /*!*background: url("/static/backgroud/s_bg_img.png") no-repeat;*!*/
  /*}*/
  /*.select-button >div{*/
    /*position: absolute;width: 80px;height: 30px;text-align: center;line-height: 30px;z-index: -1*/
  /*}*/
  /*.select-button>input{*/
    /*width: 80px;height: 30px;opacity: 0;z-index: 3*/
  /*}*/
</style>
