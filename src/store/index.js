import Vue from 'vue'
import Vuex from 'vuex'
import Vendor from '../models/vendor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vendors: [],
    isShowRegisterModal: false
  },
  mutations: {
    pushVendor(state, { id, name, description }) {
      state.vendors.push(new Vendor(id, name, description))
    },

    isShowRegisterModalToggle(state) {
      state.isShowRegisterModal = !state.isShowRegisterModal
    }
  },
  actions: {
  },
  modules: {
  }
})
