import { createStore } from 'vuex'

function updateLocalStorage(cart, p) {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('payed', p);
}

export default createStore({
  state: {
    cart: [],
    payed: false
  },
  getters: {
    payedStatus: state => {
      return state.payed;
    },

    cartQuantity: state => {
      return state.cart.reduce((a, b) => a + b.quantity, 0);
    },

    cartItems: state => {
      return state.cart;
    },

    total: state => {
      return state.cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    }
  },
  mutations: {
    setPayed (state) {
      state.payed = true;
      updateLocalStorage(state.cart, state.payed);
    },

    unsetPayed (state) {
      state.payed = false;
      updateLocalStorage(state.cart, state.payed);
    },

    addToCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        item.quantity++;
      } else {
        state.cart.push({...product, quantity: 1});
      }

      updateLocalStorage(state.cart, state.payed);
    },

    setToCart (state, payload) {
      let item = state.cart.find(i => i.id === payload.product.id);

      if(payload.amount > 0) {
        if(item) {
          item.quantity = payload.amount;
        } else {
          state.cart.push({...product, quantity: payload.amount});
        }
      } else {
        if(item) {
          state.cart = state.cart.filter(i => i.id !== payload.product.id);
        }
      }

      updateLocalStorage(state.cart, state.payed);
    },

    decreaseCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        if(item.quantity > 1) {
          item.quantity--;
        } else {
          state.cart = state.cart.filter(i => i.id !== product.id);
        }
      }

      updateLocalStorage(state.cart, state.payed);
    },

    removeCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        state.cart = state.cart.filter(i => i.id !== product.id);
      }

      updateLocalStorage(state.cart, state.payed);
    },

    clearCart (state) {
      state.cart = [];
      updateLocalStorage(state.cart, state.payed);
    },

    updateCartFromLocalStorage(state) {
      const payed = localStorage.getItem('payed');
      const cart = localStorage.getItem('cart');
      if(cart) {
        state.cart = JSON.parse(cart);
      }
      state.payed = payed;
    }
  }
})