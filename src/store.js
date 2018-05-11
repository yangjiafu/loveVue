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
  user:{
    id:'',
    name:'',
    email:'',
  },
  coockie:{

  },
  isLoading: false,
}

const mutations = {
  setCookie(self,dates){
    var exdate = new Date();//获取时间
    exdate.setTime(exdate.getTime()+24*60*60*1000*dates.days);//保存天数
    window.document.cookie = 'userId'+'='+dates.id+';path=/;expires='+exdate.toGMTString();
    window.document.cookie = 'userToken'+'='+dates.token+';path=/;expires='+exdate.toGMTString();
  },
  setTitle(state,title){
    if (title == '/home')
      state.title = '首页'
    else if(title =='/hot')
      state.title = '热门'
    else if(title == '/search')
      state.title = '搜索'
    else if(title == '/user')
      state.title = '用户'
  },
  updateLoadingStatus(state,payload){
    console.log(payload)
    state.isLoading = payload
  },

  setUserInfo(state,obj) {
    state.user.id = obj.id
    state.user.name = obj.name
    state.user.email = obj.email
    console.log('修改成功'+obj);
  },
  cheakUserInfo(state){
    var info = document.cookie.substring(0)
    console.log(info);
  },
  clearUsersInfo(state) {
    state.user.id = ''
    state.user.name = ''
    state.user.email = ''
    console.log('清除成功');
  },
  setMovieList(state,MovieList){
    state.movieInfo.m_a_list = MovieList
    console.log('不清除数据'+MovieList)
  },
  clearMovieList(){
    state.movieInfo.m_a_list = []
  },
  filterMovieInfo(state,id){
    // console.log('Id: '+id);
    console.log(state.movieInfo.m_a_list)
    for(let m in state.movieInfo.m_a_list){
      console.log('输出所有电影id'+state.movieInfo.m_a_list[m].id);
      if(state.movieInfo.m_a_list[m].id == id){
        state.movieInfo.m_o_list = state.movieInfo.m_a_list[m]
        break
      }
    }
    // return state.movieList
  },

}

const getters = {
  getUserInfo() {
    if(document.cookie.length>0){

    }
    return state.name
  },
  get_m_o_Info(){//获取过滤后的电影
    return state.movieInfo.m_o_list
  },
  getCookie(){
    if(window.document.cookie.length>0){
      var arr = document.cookie.split(';')
      var obj = {id:'',token:''}
      var userId=arr[0].replace('userId=','')
      var userToken=arr[1].replace('userToken=','')
      obj = {id:userId,token:userToken}
      return obj
    }else
      return false
  },
}

export default new Vuex.Store({
  state,mutations,getters
})

