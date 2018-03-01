import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  count: 23,
  name:'',
  token:'',
  pwd:''
}

const mutations = {
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

