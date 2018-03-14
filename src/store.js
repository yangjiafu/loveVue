import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  url:'http://localhost:8000/',
  qs:require('qs'),//post请求是data的格式处理
  title:'首页',
  isLoading: false,
  count: 23,
  name:'',
  token:'',
  pwd:''
}

const mutations = {
  setTitle(state,title){
    if (title == '/home')
      state.title = '首页'
    else if(title =='/hot')
      state.title = '热门'
    else if(title == '/news')
      state.title = '新闻'
    else if(title == '/user')
      state.title = '用户'
  },
  updateLoadingStatus(state,payload){
    console.log(payload)
    state.isLoading = payload
  },
  add(state){
    state.count += 1
  },
  setUserInfo(state,obj) {
    document.cookie = obj.name + ':' + obj.token
    state.name = obj.name
    state.token = obj.token
    console.log('修改成功');
  },
  cheakUserInfo(state){
    // var end = document.cookie.indexOf('')
    var info = document.cookie.substring(0)
    console.log(info);
  },
  clearUserInfo(state) {
    state.name=''
    state.pwd=''
    state.token=''
  }
}

const getters = {
  getUserInfo() {
    if(document.cookie.length>0){

    }
    return state.name
  }
}

export default new Vuex.Store({
  state,mutations,getters
})

