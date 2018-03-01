import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import hot from '@/components/hot'
import user from '@/components/user'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/hot',
      name: 'hot',
      component:hot
    },{
      path:'/user',
      name:'user',
      component:user
    }
  ]
})


