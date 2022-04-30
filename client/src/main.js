import { createApp } from 'vue';
import { createStore } from 'vuex';
import naive from 'naive-ui';
import App from './App.vue';
import router from './router';

const store = createStore({
    state: {
        user: {},
        isLoggedIn: false
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        user: state => state.user
    },
    mutations: {
        setUser(state, user) {
            state.isLoggedIn = true;
            state.user = user;
        },
        logoutUserState(state) {
            state.isLoggedIn = false;
            state.user = {};
        }
    }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(naive);
app.mount('#app');
