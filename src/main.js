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

router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path ==='/registered'){
    next()
  }else if(store.state.user.id) {
    next()
  }else {
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
