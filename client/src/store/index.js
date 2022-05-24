import { createStore } from 'vuex'

function updateLocalStorage(cart, p, group, checkout, id) {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('payed', p);
  localStorage.setItem('groupCart', group);
  localStorage.setItem('checkout', checkout);
  localStorage.setItem('id', id);
}

export default createStore({
  state: {
    cart: [],
    payed: false,
    groupCart: -1,
    checkout: false,
    id: -1
  },
  getters: {
    userId: state => {
      return state.id;
    },

    checkout: state => {
      return state.checkout;
    },

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
    setUserId(state, i) {
      state.id = i;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    setCheckout(state, v) {
      state.checkout = v;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    setGroupCart(state, groupCart) {
      state.groupCart = groupCart;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    setPayed (state) {
      state.payed = true;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    unsetPayed (state) {
      state.payed = false;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    addToCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        item.quantity++;
      } else {
        state.cart.push({...product, quantity: 1});
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    setCart (state, cart) {
      state.cart = cart;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    removeCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        state.cart = state.cart.filter(i => i.id !== product.id);
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    clearCart (state) {
      state.cart = [];
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id);
    },

    updateCartFromLocalStorage(state) {
      const groupCart = localStorage.getItem('groupCart');
      const payed = localStorage.getItem('payed');
      const cart = localStorage.getItem('cart');
      const checkout = localStorage.getItem('checkout');
      const id = localStorage.getItem('id');

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
      state.checkout = checkout;
      if(state.checkout == null) {
        state.checkout = false;
      }
      state.id = id;
      if(state.id == null) {
        state.id = -1;
      }
    }
  }
})