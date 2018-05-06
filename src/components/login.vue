<template>
  <div class="box">
    <div class="react-box" :class="{'show-box reg-style':box.show_reg}">
      <div class="input-box">
        <input type="text" class="account" placeholder="昵称" maxlength="6" v-model="regUser.name">
      </div>
      <div class="input-box">
        <input type="text" class="account" placeholder="邮箱" maxlength="20" v-model="regUser.email">
      </div>
      <div class="input-box">
        <input type="password" class="account" placeholder="密码" maxlength="16" v-model="regUser.pwd">
      </div>
      <div class="input-box">
        <input type="text" class="account"placeholder="验证码" maxlength="4"  v-model="regUser.code">
        <p class="get-code">
          <span v-if="regUser.s==60" @click="getCode('reg')">获取验证码</span>
          <span v-if="regUser.s<60" style="color: aliceblue" :class="{'color-red':regUser.s<10}">{{regUser.s}}s</span>
        </p>
      </div>
      <div class="login-button"  style="color: yellow;border-color: yellow" >注册账号</div>
    </div>
    <div class="react-box" style="background: none" :class="{'show-box':box.show_login}">
      <div class="input-box">
        <i class="iconfont" style="font-size: 20px;color: #ddd;vertical-align: middle">&#xe67b;</i>
        <input type="text" class="account" @focus="clear" v-model="loginUser.account" placeholder="账号或邮箱">
        <span class="transparant" :class="{'error-style':loginUser.n_account}">!</span>
        <span class="transparant" :class="{'error-style':loginUser.e_user}">用户不存在!</span>
      </div>
      <div class="input-box">
        <i class="iconfont" style="font-size: 20px;color: #ddd;vertical-align: middle">&#xe652;</i>
        <input type="password" class="account" @focus="clear" v-model="loginUser.pwd" placeholder="密码" >
        <span class="transparant" :class="{'error-style':loginUser.e_pwd}">密码错误!</span>
        <span class="transparant"  :class="{'error-style':loginUser.n_pwd}">!</span>
      </div>
      <div class="login-button" @click="login">
          登录
      </div>
    </div>
    <div class="react-box" :class="{'show-box reg-style':box.show_forget}">
      <div class="input-box">
        <input type="text" class="account" maxlength="20" placeholder="邮箱或账号" v-model="forgetUser.email">
      </div>
      <div class="input-box">
        <input type="text" class="account" maxlength="16" placeholder="新密码" v-model="forgetUser.pwd">
      </div>
      <div class="input-box">
        <input type="text" class="account"placeholder="验证码" maxlength="4"  v-model="forgetUser.code">
        <p class="get-code">
          <span v-if="forgetUser.s==60" @click="getCode('forget')">获取验证码</span>
          <span v-if="forgetUser.s<60" style="color: aliceblue" :class="{'color-red':forgetUser.s<10}">{{forgetUser.s}}s</span>
        </p>
      </div>
      <div class="login-button"  style="color: yellow;border-color: yellow" >提交</div>
    </div>


    <p v-if="box.show_login" class="forget-pwd" style="left: 20px" @click="changeBox('reg')">注册账号</p>
    <p v-if="box.show_login" class="forget-pwd" style="right: 20px;" @click="changeBox('forget')">忘记密码</p>
    <p v-if="!box.show_login" class="forget-pwd" style="right: 20px"
       @click="changeBox('login')">登录</p>
  </div>
</template>
<script>
  import {Group,XInput} from 'vux'
  import {mapState,mapMutations} from 'vuex'
  export default{
      components:{
         Group,XInput
      },
      data(){
          return{
              style_red:{
                  color:'red;'
              },
              loginUser:{
                account:'',
                n_account:false,
                e_user:false,
                pwd:'',
                n_pwd:false,
                e_pwd:false
              },
              regUser:{
                name:'',
                email:'',
                pwd:'',
                code:'',
                s:60
              },
              forgetUser:{
                email:'',
                pwd:'',
                code:'',
                s:60
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
      ...mapMutations(['setUserInfo']),
          clear(){
            this.loginUser.n_account = false
            this.loginUser.e_user=false
            this.loginUser.n_pwd=false
            this.loginUser.e_pwd=false
          },
          login(){
            if(this.loginUser.account.length<1){
                  this.loginUser.n_account = true
              }else if(this.loginUser.pwd.length<1){
                  this.loginUser.n_pwd = true
              }else {
                  let _this = this
                  this.$http.post(this.url+'login',
                  this.qs.stringify({
                    'account':this.loginUser.account,
                    'pwd':this.loginUser.pwd,
                    'token':''
                  })
                  ).then(function (res) {
                      if(res.data=='not'){
                        _this.loginUser.e_user = true
                      }else if(res.data=='error'){
                          _this.loginUser.e_pwd = true
                      }else {
                        _this.setUserInfo(res.data)
                        _this.$router.push({name:'home'})
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
              if(type==='reg'){
                  this.box.show_reg = true
              }else if(type==='login'){
                  this.box.show_login=true
              }else {
                this.box.show_forget=true
              }
          },
          getCode(type){
            console.log(type);
            var _this = this
            if(type=='reg'){
              _this.regUser.s--
              var t = setInterval(function () {
                _this.regUser.s--
                if(_this.regUser.s<0){
                  _this.regUser.s=60
                  clearTimeout(t)
                }
              },1000)
            }else {

              _this.forgetUser.s--
              var t = setInterval(function () {
                _this.forgetUser.s--
                if(_this.forgetUser.s<0){
                  _this.forgetUser.s=60
                  clearTimeout(t)
                }
              },1000)
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

  .react-box{
    width: 0;
    height: 0;
    overflow: hidden;
    background: rgba(0,0,0,.3);
    transition: all .3s;
  }
  .show-box{
    width: 70%;
    height: 200px;
    padding: 10px 20px;
    margin: 60% auto 0;
  }
  .account{
    width: 70%;
    height: 30px;
    color: #f9f9f9;
    font-size: 16px;
    padding-left: 5px;
    vertical-align: middle;
    background-color: transparent;
    border: none;
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
  .reg-style{
    margin-top: 40%;
    height: auto
  }
  .get-code{
    position: absolute;
    width: 100px;
    border-left: 1px solid #eee;
    line-height: 38px;
    margin: 0;
    right: 0;
    top: 0
  }
  .color-red{
    font-weight: bold;
    color: red!important;
  }
</style>
