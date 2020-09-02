import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
  /*
  // state: 用于保存全局共享数据
  state: {
    isNormalPlayer: false
  },
  // mutations: 用于保存修改全局共享数据的方法
  mutations: {
    changeNormalPlayer (state, flag) {
      state.isNormalPlayer = flag
    }
  },
  // actions: 用于保存触发mutations中保存的方法的方法
  actions: {
    setNomalPlayer ({ commit }, flag) {
      commit('changeNormalPlayer', flag)
    }
  },
  getters: {
    isNormalPlayer (state) {
      return state.isNormalPlayer
    }
  }
   */
})
