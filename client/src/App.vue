<script setup>
import Header from './components/Header.vue';
import { useMessage } from 'naive-ui';

window.$message = useMessage();
</script>

<template>
  <n-space vertical>
    <n-layout style="height: 100vh; display: flex; flex-direction: column;">
      <n-layout-header bordered>
        <Header :key="updateHeader" />
      </n-layout-header>
      <div style="display: flex; flex: 1 0 auto; padding: 2rem; flex-direction: column; justify-content: flex-start;">
        <router-view :key="updateBody" @cartChange="updateCart" @openCart="createGroup" @joinGroup="connectToGroup" @addToCart="addToCart" @removeFromCart="removeFromCart" />
      </div>
      <n-layout-footer bordered>
        hello
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script>
export default {
  data () {
    return {
      updateHeader: 0,
      updateBody: 0,
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
      this.$store.commit('setCart', cart['cart']);
      this.updateHeader++;
      this.updateBody++;
    },
    checkoutGroupCart() {
      this.$store.commit('clearCart');
      this.$store.commit('setGroupCart', -1);
      if(this.$store.getters.checkout != true) {
        window.$message.warning('The group cart was checked out')
        this.updateHeader++;
        this.updateBody++;
      }
    },
    cartClosed() {
      window.$message.warning('The owner of the group cart closed it')
      this.$store.commit('clearCart');
      this.$store.commit('setGroupCart', -1);
      this.updateHeader++;
      this.updateBody++;
    }
  },
  methods: {
    updateCart() {
      this.updateHeader++;
      this.updateBody++;
    },
    addToCart(item) {
      this.$socket.client.emit('addToCart', {
        cart_id: this.$store.getters.groupCart,
        item: item
      });
      this.updateHeader++;
    },
    removeFromCart(item) {
      this.$socket.client.emit('removeFromCart', {
        cart_id: this.$store.getters.groupCart,
        item: item
      });
      this.updateHeader++;
    },
    connectToGroup(id) {
      this.$socket.client.emit('connectToGroup', { cart_id: id }, (data) => {
        if(data == 400) {
          window.$message.error('Cart does not exist');
        } else {
          this.$store.commit('setGroupCart', id);
        }
      });
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
      this.$socket.client.emit('createGroup', {
        cart_id: gObject['id']
      });
      this.$store.commit('setGroupCart', gObject['id']);
    }
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
