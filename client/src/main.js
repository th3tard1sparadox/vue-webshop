import { createApp } from 'vue';
import naive from 'naive-ui';
import App from './Holder.vue';
import router from './router';
import store from './store';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5000');
const app = createApp(App);
app.use(VueSocketIOExt, socket);
app.use(store);
app.use(router);
app.use(naive);
app.mount('#app');
