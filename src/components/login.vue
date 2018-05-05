<template>
  <div class="box">
    <div class="react-box" :class="{'show-box':box.show_reg}">
      <p>注册账号</p>
    </div>
    <div class="react-box" :class="{'show-box':box.show_login}">
      <div class="input-box">
        <i class="iconfont" style="font-size: 20px;color: #ddd;vertical-align: middle">&#xe67b;</i>
        <input type="text" class="account" @focus="clear" v-model="t_user.account" placeholder="账号或邮箱">
        <span class="transparant" :class="{'error-style':t_user.n_account}">!</span>
        <span class="transparant" :class="{'error-style':t_user.e_user}">用户不存在!</span>
      </div>
      <div class="input-box">
        <i class="iconfont" style="font-size: 20px;color: #ddd;vertical-align: middle">&#xe652;</i>
        <input type="password" v-model="t_user.pwd" @focus="clear" placeholder="密码" class="account">
        <span class="transparant" :class="{'error-style':t_user.e_pwd}">密码错误!</span>
        <span class="transparant"  :class="{'error-style':t_user.n_pwd}">!</span>
      </div>
      <div class="login-button" @click="login">
          登录
      </div>
    </div>
    <div class="react-box" :class="{'show-box':box.show_forget}">
      <p>忘记密码</p>
    </div>
    <p v-if="!box.show_reg" class="forget-pwd" style="left: 20px" @click="changeBox('reg')">注册账号</p>
    <p v-if="!box.show_forget" class="forget-pwd" style="right: 20px;" @click="changeBox('forget')">忘记密码</p>
    <p v-if="!box.show_login" class="forget-pwd"
       :style="styleRL"
       @click="changeBox('login')">登录</p>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
      data(){
          return{
              styleRL:{
                  right:'0',
                  left:'0'
              },
              t_user:{
                account:'',
                n_account:false,
                e_user:false,
                pwd:'',
                n_pwd:false,
                e_pwd:false
              },
              box:{
                show_reg:false,
                show_login:true,
                show_forget:false
              }
          }
      },
    computed:{
      ...mapState(['qs','url','user'])
    },
    methods:{
          clear(){
            this.t_user.n_account = false
            this.t_user.e_user=false
            this.t_user.n_pwd=false
            this.t_user.e_pwd=false
          },
          login(){
            if(this.t_user.account.length<1){
                  this.t_user.n_account = true
              }else if(this.t_user.pwd.length<1){
                  this.t_user.n_pwd = true
              }else {
                  let _this = this
                  this.$http.post(this.url+'login',
                  this.qs.stringify({
                    'account':this.t_user.account,
                    'pwd':this.t_user.pwd,
                    'token':''
                  })
                  ).then(function (res) {
                      if(res.data=='not'){
                        _this.t_user.e_user = true
                      }else if(res.data=='error'){
                          _this.t_user.e_pwd = true
                      }
                    console.log(res)
                  }).catch(function (error) {
                    console.log(error);
                  })
            }
          },
          changeBox(type){
              this.box.show_reg=false;
              this.box.show_login=false;
              this.box.show_forget=false;
              this.styleRL.right =';'
              this.styleRL.left = ';'
              if(type==='reg'){
                  this.box.show_reg = true
                  this.styleRL.left='20px;'
              }else if(type==='login'){
                  this.box.show_login=true
              }else {
                this.box.show_forget=true
                this.styleRL.right = '20px;'
              }
          }
    }
  }
</script>
<style>
  .box{
    position: fixed;
    width: 100%;
    height: 100%;
    background: url(/static/backgroud/loginBkg.jpg) no-repeat
  }
  /*.login-box{*/
    /*width: 70%;*/
    /*height: 250px;*/
    /*margin: 60% auto 0;*/
  /*}*/
  /*.registered-box{*/
    /*width: 70%;*/
    /*height: 250px;*/
    /*margin: 60% auto 0;*/
  /*}*/
  .react-box{
    width: 0;
    height: 0;
    overflow: hidden;
    transition: all .3s;
  }
  .show-box{
    width: 70%;
    height: 250px;
    margin: 60% auto 0;
  }
  .account{
    width: 80%;
    height: 30px;
    color: #f9f9f9;
    font-size: 16px;
    padding-left: 5px;
    vertical-align: middle;
    background-color: transparent;
    border: none;
    /*border-bottom: 1px solid #f9f9f9*/
  }
  .account:focus{
    outline: none;
  }
  .input-box{
    height: 38px;
    width: 100%;
    position: relative;
    /*border: 1px solid #eee;*/
    /*background-color: rgba(0,0,0,.3);*/
    /*border-radius: 30px;*/
    padding-top: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .login-button{
    height: 38px;
    width: 98%;
    color: #fff;
    line-height: 38px;
    margin: auto;
    border: 1px solid #f9f9f9;
  }
  .transparant{
    color: transparent;
    position: absolute;
    top: 8px;
    right: 0;
    transition: all .8s;
  }
  /*.not-style{*/
    /*color: red;*/
    /*font-size: 16px;*/
    /*transition: all .8s;*/
  /*}*/
  .error-style{
    color: red;
    transition: all .8s;
  }
  .forget-pwd{
    position: absolute;
    width: 100px;
    /*left:20px;*/
    bottom: 5px;
    color: aliceblue
  }
</style>
