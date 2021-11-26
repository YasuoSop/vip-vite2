import store from '@/store'

export default {
  namespaced:true,
  state:{
    comprehensive: "drug",
    keywords: "",
  },
  getters: {

  },
  mutations: {
    sendKeywords (state, Payload) {
      state.keywords = Payload
    },
    sendComprehensive (state, Payload) {
      state.comprehensive = Payload
    },
  },
  actions: {

  }
}