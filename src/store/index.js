import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import cart from './modules/cart'
import user from './modules/user'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart
  },
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        cart: val.cart
      }
    }
  })]
})

export default store
