<template>
  <div>
    <div class="publish-top">
      <div class="cancel left" @click="goBack">取消</div>
      <div class="title">
        <!--<span>发个信息</span>-->
        <span style="line-height: 40px">yousername</span>
      </div>
      <div class="commit-button right"
           :class="{'permit-commit':comment.length>0}"
           @click="commitComment">发布</div>
    </div>
    <div class="publish-body">
      <textarea placeholder="分享些什么吧..." v-model="comment" name="" id="" cols="30" rows="10">

      </textarea>
    </div>
    <form name="f_upload" enctype="multipart/form-data">
      <input type="text" name="username" /><br>
      <input type="file" name="filename" accept="image/*"  multiple="multiple" @change="selectImg()" /><br>
      <input type="submit" value="上传" />
    </form>
    <div id="imgBox"></div>
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
              is_error:false
          }
      },
      computed:{
          ...mapState(['url','qs','user'])
      },
      methods:{
            goBack(){
              this.$router.go(-1)
            },
            commitComment(){
                let _this = this
                this.$http.post(_this.url+'commitHotComment',
                  _this.qs.stringify({
                    type:'comment',
                    h_uid:_this.user.id,
                    h_comment: _this.comment,
                    })
                  ).then(function (res) {
                  _this.isPublish=true
                  if(res.data=='success'){
                      _this.is_success=true
                  }else {
                      _this.is_error=true
                  }
                  setInterval(function () {
                    _this.is_success=false
                    _this.is_error=false
                    _this.isPublish=false
                  },1000)
                }).catch(function (error) {
                    alter(error);
                })
            },
            selectImg(){
              var fil = event.target.files;
              console.log(fil);
              for (var i=0;i<fil.length;i++) {
                console.log(fil[i]);
                console.log('--------------------------');
                this.reads(fil[i]);
              }
            },
            reads(fil){
              var reader = new FileReader();
              reader.readAsDataURL(fil);
              reader.onload = function(){
                 document.getElementById("imgBox").innerHTML += "<img src='"+reader.result+"'>";
  //              $('#inputs').after("<img src='"+reader.result+"'>");
              };
            }
      }
  }
</script>
<style>
  .publish-top{
    position: fixed;
    height: 40px;
    width: 100%;
    background-color: #F9F9FA;
    border-bottom: 1px solid #E5E5E5;
    color: #111;
    text-align: center;
  }
  .cancel{
    width: 50px;
    height: 100%;
    display: inline-block;
    line-height: 40px;
  }
  .title{
    height: 100%;
    width: 100px;
    margin: auto;
    display: inline-block;
  }
  .commit-button{
    width: 50px;
    height: 30px;
    color: #ccc;
    display: inline-block;
    line-height: 30px;
    margin: 5px 20px;
    border: 1px solid #ddd;
    box-sizing: content-box;
    border-radius: 2px;
  }
  .publish-body{
    width: 100%;
    height: auto;
    padding-top: 40px;
  }
  .publish-body textarea{
    width: 90%;
    height: auto;
    border: hidden;
    margin: 20px;
    box-sizing: content-box;
  }
  textarea:focus{
    outline: none;
  }
  .permit-commit{
    background-color: #FF6B38;
    border-radius: 2px;
    border: none;
    color: #fff;
  }
  .commit-prompt{
    position: absolute;
    width: 80px;
    height: 80px;
    margin: auto;
    left:0;
    right: 0;
    color: #FF6B38;
    background: rgba(0,0,0,0.1);
    transition: all .1s;
    border-radius: 5px;
    /*background: #cccccc*/
  }
</style>
