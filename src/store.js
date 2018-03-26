import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  url:'http://localhost:8000/',
  qs:require('qs'),//post请求是data的格式处理
  title:'首页',
  movieInfo:{
    m_a_list:[],//所有电影信息列表
    m_o_list:[]//传入id过滤后的一个电影
  },
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
  },
  setMovieList(state,MovieList){
    state.movieInfo.m_a_list = MovieList
    // state.movieList = []
    console.log('不清楚数据'+MovieList)
  },
  clearMovieList(){
    state.movieInfo.m_a_list = []
  },
  filterMovieInfo(state,id){
    console.log('Id: '+id);
    console.log(state.movieInfo.m_a_list)
    for(let m in state.movieInfo.m_a_list){
      console.log('输出所有电影id'+state.movieInfo.m_a_list[m].id);
      if(state.movieInfo.m_a_list[m].id == id){
        state.movieInfo.m_o_list = state.movieInfo.m_a_list[m]
        break
      }
    }
    // return state.movieList
  }
}

const getters = {
  getUserInfo() {
    if(document.cookie.length>0){

    }
    return state.name
  },
  get_m_o_Info(){//获取过滤后的电影
    return state.movieInfo.m_o_list
  }
}

export default new Vuex.Store({
  state,mutations,getters
})

