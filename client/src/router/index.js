import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Stickers from '../pages/Stickers.vue';
import Profile from '../pages/Profile.vue';
import NotFound from '../pages/404.vue';
import SignupCard from '../pages/Signup_in-card.vue';
import Wishlist from '../pages/Wishlist.vue';
import Cart from '../pages/Cart.vue';
import Success from '../pages/Success.vue';
import Cancel from '../pages/Cancel.vue';

const routes = [
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
        component: async () => await import('../pages/ProductPage.vue')
    },
    {
        path: "/user",
        name: "User",
        component: Profile
    },
    {
        path: "/login",
        name: "Login",
        component: SignupCard
    },
    {
        path: "/wishlist",
        name: "Wishlist",
        component: Wishlist
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/success",
        name: "Success",
        component: Success
    },
    {
        path: "/cancel",
        name: "Cancel",
        component: Cancel
    },
    {
        path: "/404",
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;