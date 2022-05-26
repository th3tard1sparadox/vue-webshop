import { createStore } from 'vuex'

function updateLocalStorage(cart, p, group, checkout, id, email) {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('payed', p);
  localStorage.setItem('groupCart', group);
  localStorage.setItem('checkout', checkout);
  localStorage.setItem('id', id);
  localStorage.setItem('email', email);
}

export default createStore({
  state: {
    cart: [],
    payed: false,
    groupCart: -1,
    checkout: false,
    id: -1,
    email: ''
  },
  getters: {
    email: state => {
      return state.email;
    },

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
    setEmail(state, em) {
      state.email = em;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    setUserId(state, i) {
      state.id = i;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    setCheckout(state, v) {
      state.checkout = v;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    setGroupCart(state, groupCart) {
      state.groupCart = groupCart;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    setPayed (state) {
      state.payed = true;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    unsetPayed (state) {
      state.payed = false;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    addToCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        item.quantity++;
      } else {
        state.cart.push({...product, quantity: 1});
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    setCart (state, cart) {
      state.cart = cart;
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
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

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    removeCart (state, product) {
      let item = state.cart.find(i => i.id === product.id);

      if(item) {
        state.cart = state.cart.filter(i => i.id !== product.id);
      }

      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    clearCart (state) {
      state.cart = [];
      updateLocalStorage(state.cart, state.payed, state.groupCart, state.checkout, state.id, state.email);
    },

    updateCartFromLocalStorage(state) {
      const groupCart = localStorage.getItem('groupCart');
      const payed = localStorage.getItem('payed');
      const cart = localStorage.getItem('cart');
      const checkout = localStorage.getItem('checkout');
      const id = localStorage.getItem('id');
      const email = localStorage.getItem('email');

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
      if(email) {
        state.email = email;
      }
    }
  }
})