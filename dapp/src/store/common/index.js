import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    successFlag: false,
    successMessage: '',
    errorFlag: false,
    errorMessage: '',

  },
  mutations: {
    succes(state, msg) {
      state.errorShow = false
      state.successMessage = true
      state.successMessage = msg
    },
    error(state, msg) {
      state.successMessage = false
      state.errorShow = true
      state.errorMessage = msg
    },

  },
  getters: {
    successFlag: state => {
      return state.successFlag
    },
    successMessage: state => {
      return state.successMessage
    },
    errorFlag: state => {
      return state.errorFlag
    },
    errorMessage: state => {
      return state.errorMessage
    },
  }
})
