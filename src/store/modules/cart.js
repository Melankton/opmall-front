const cart = {
  state: {
    cart: [],
    url: ''
  },
  mutations: {
    ADD_URL: (state, item) => {
      state.url = item
    },
    ADD_CART: (state, item) => {
      const p = []
      for (let i = 0; i < state.cart.length; i++) {
        if (item.id === state.cart[i].id) {
          p.push(item)
          state.cart[i].num = state.cart[i].num + item.num
        }
      }
      if (p.length === 0) {
        state.cart.push(item)
      }
    },
    DELETE_CART: (state, item) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (item === state.cart[i].id) {
          state.cart.pop(i)
        }
      }
    },
    CLEAN_CART: (state) => {
      state.cart = []
    }
  },
  actions: {
    addUrl({ commit }, item) {
      return new Promise(resolve => {
        commit('ADD_URL', item)
      })
    },
    add({ commit }, item) {
      return new Promise(resolve => {
        commit('ADD_CART', item)
      })
    },
    delete({ commit }, item) {
      return new Promise(resolve => {
        commit('DELETE_CART', item)
      })
    },
    cleanCart({ commit }) {
      return new Promise(resolve => {
        commit('CLEAN_CART')
      })
    }
  }
}

export default cart
