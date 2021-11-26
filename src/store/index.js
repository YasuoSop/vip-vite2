/*
 * @Author: your name
 * @Date: 2020-11-12 14:12:52
 * @LastEditTime: 2021-01-19 08:56:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vip.yaozh.com\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/assets/state/index.csv'
import modules from './modules'
import func from '@/assets/js/func'

Vue.use(Vuex)
Vue.use(func)
let vue = new Vue()

const store = new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production',
  state: {
    Conf: {
      stateObj: state.reduce((res, item) => {
        res[item.code] = item
        return res
      }, {})
    },
    listLoading: false,
    searchLoading: false,
    showPromtNotice: false  // 是否显示公告提示
  },
  mutations: {
    searchLoading(state, Payload) {
      state.searchLoading = Payload
    },
    listLoading(state, Payload) {
      state.listLoading = Payload
    },
    showPromtNotice(state, Payload) {
      state.showPromtNotice = Payload
    },
  },
  actions: {

  },
  modules: modules,
})
store.vue = vue
export default store
