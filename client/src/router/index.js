import { createRouter, createWebHistory } from 'vue-router';
import Ping from '../components/Ping.vue';

const routes = [
    {
        path: '/ping',
        name: 'Ping',
        component: Ping
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;