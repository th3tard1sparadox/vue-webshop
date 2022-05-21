<script setup>
import Header from './components/Header.vue';
import { darkTheme } from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-space vertical>
        <n-layout style="height: 100vh; display: flex; flex-direction: column;">
          <n-layout-header bordered>
            <Header :key="update" />
          </n-layout-header>
          <div style="display: flex; flex: 1 0 auto; padding: 2rem; flex-direction: column; justify-content: flex-start;">
            <router-view @cartChange="updateCart" @openCart="createGroup" @joinGroup="connectToGroup" @addToCart="addToCart" @removeFromCart="removeFromCart" />
          </div>
          <n-layout-footer bordered>
            hello
          </n-layout-footer>
        </n-layout>
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
export default {
  data () {
    return {
      update: 0,
    };
  },
  sockets: {
    connect() {
      console.log('socket connected');
      if(this.$store.getters.groupCart != -1) {
        this.connectToGroup(this.$store.getters.groupCart);
      }
    },
    updateGroupCart(cart) {
      this.update++;
      this.$store.commit('setCart', cart['cart']);
    }
  },
  methods: {
    updateCart() {
      this.update++;
      console.log('hello')
      if(this.$store.getters.groupCart != -1) {
        this.connectToGroup(this.$store.getters.groupCart);
      }
    },
    addToCart(item) {
      this.updateCart();
      this.$socket.client.emit('addToCart', {
        cart_id: this.$store.getters.groupCart,
        item: item
      });
    },
    removeFromCart(item) {
      console.log('Remove in App.vue')
      this.updateCart();
      this.$socket.client.emit('removeFromCart', {
        cart_id: this.$store.getters.groupCart,
        item: item
      });
    },
    connectToGroup(id) {
      this.$socket.client.emit('connectToGroup', { cart_id: id });
      this.$store.commit('setGroupCart', id);
    },
    createGroup: async function() {
      const gResponse = await fetch("http://localhost:5000/profile", {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
          
      });
      const gObject = await gResponse.json();
      console.log(gObject);
      this.$socket.client.emit('createGroup', {
        cart_id: gObject['id']
      });
      this.$store.commit('setGroupCart', gObject['id']);
    },
    closeCart() {},
    checkoutCart() {}
  },
  mounted() {
    this.$store.commit('updateCartFromLocalStorage');
  }
}
</script>
<style>
@import './assets/base.css';

#app {
  margin: 0 auto;
  font-weight: normal;
  height: 100%;
}

.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
}
</style>
