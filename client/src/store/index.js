import { createStore } from 'vuex'

function updateLocalStorage(cart, p, group) {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('payed', p);
  localStorage.setItem('groupCart', group);
}

export default createStore({
  state: {
    cart: [],
    payed: false,
    groupCart: -1
  },
  getters: {
    groupCart: state => {
      return state.groupCart;
    },

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
    setGroupCart(state, groupCart) {
      state.groupCart = groupCart;
      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    setPayed (state) {
      state.payed = true;
      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    unsetPayed (state) {
      state.payed = false;
      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    addToCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        item.quantity++;
      } else {
        state.cart.push({...product, quantity: 1});
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    setCart (state, cart) {
      state.cart = cart;
      updateLocalStorage(state.cart, state.payed, state.groupCart);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    removeCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        state.cart = state.cart.filter(i => i.id !== product.id);
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    clearCart (state) {
      state.cart = [];
      updateLocalStorage(state.cart, state.payed, state.groupCart);
    },

    updateCartFromLocalStorage(state) {
      const groupCart = localStorage.getItem('groupCart');
      const payed = localStorage.getItem('payed');
      const cart = localStorage.getItem('cart');
      if(cart) {
        state.cart = JSON.parse(cart);
      }
      state.payed = payed;
      if(state.payed == null) {
        state.payed = false;
      }
      state.groupCart = groupCart;
      if(state.groupCart == null) {
        state.groupCart = -1;
      }
    }
  }
})