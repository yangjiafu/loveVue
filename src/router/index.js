import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import hot from '@/components/hot'
import user from '@/components/user'
import login from '@/components/login'
import index from '@/components/index'
import news from '@/components/news'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'index',
      component:index,
      children:[
        {
          path:'/',
          name:'home',
          component:home
        },{
          path: '/hot',
          name: 'hot',
          component:hot
        },{
          path:'/user',
          name:'user',
          component:user
        },{
          path:'/news',
          name:'news',
          component:news
        }
        ]
    },{
      path:'/search',
      name:'search',
      component:search
    },{
      path:'/login',
      name:'login',
      component:login
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: home
    // },
  ]
})


