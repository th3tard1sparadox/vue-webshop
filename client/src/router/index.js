import { createRouter, createWebHistory } from 'vue-router';
import Ping from '../components/Ping.vue';
import Home from '../components/Home.vue'
import Stickers from '../components/Stickers.vue'

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
    {
        path: '/stickers',
        name: "Stickers",
        component: Stickers
    },
    {
        path: '/stickers/:id',
        name: "Sticker",
        component: async () => await import('../components/ProductPage.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;