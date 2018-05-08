// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/iconfont/iconfont.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.prototype.$ajax = axios;

router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path ==='/registered'){
    next()
  }else if(store.state.user.id) {
    next()
  }else {
    console.log(store.state.user.id);
    next({path:'/login'})
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


// this.$http.post(this.url+'login',
//   this.qs.stringify({
//     'account':this.loginUser.account,
//     'pwd':this.loginUser.pwd,
//     'token':''
//   })
// ).then(function (res) {
//   if(res.data=='not'){
//     _this.loginUser.e_user = true
//   }else if(res.data=='error'){
//     _this.loginUser.e_pwd = true
//   }else {
//     res.data.days=7
//     _this.setCookie(res.data)
//     _this.setUserInfo(res.data)
//     _this.$router.push({name:'home'})
//   }
//   console.log(res)
// }).catch(function (error) {
//   console.log(error);
// })
