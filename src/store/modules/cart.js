const cart = {
  state: {
    cart: []
  },
  mutations: {
    ADD_CART: (state, item) => {
      const p = []
      for (let i = 0; i < state.cart.length; i++) {
        if (item.id === state.cart[i].id) {
          p.push(item)
          state.cart[i].num = state.cart[i].num + item.num
          state.cart[i].price = state.cart[i].price + item.price
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
