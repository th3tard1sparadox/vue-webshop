import { createRouter, createWebHistory } from 'vue-router';
import Ping from '../components/Ping.vue';
import Home from '../components/Home.vue'

const routes = [
    {
        path: '/ping',
        name: 'Ping',
        component: Ping
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;