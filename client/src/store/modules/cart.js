import nested from './nested'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: null
})

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    console.log(state.items);
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        id: product.id,
        name: product.name,
        desc: product.desc,
        path: product.path,
        picture: product.picture,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  async checkout ({ commit, state }, products) {
    // checkout here
  },

  addProductToCart ({ state, commit }, productId) {
    commit('setCheckoutStatus', null)
      const cartItem = state.items.find(item => item.id === productId)
      console.log(productId);
      if (!cartItem) {
        commit('pushProductToCart', { id: productId })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
  }
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    console.log(id);
    state.items.push({
      id,
      quantity: 1
    })
    console.log(state.items);
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
    console.log(state.items);
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    nested
  }
}