<template>
    <h1 style="margin-bottom: 2rem;">
        Cart overview:
    </h1>
    {{ products }}
    <n-list bordered>
        <n-list-item
            v-for="product in products"
            :key="product.id"
        >
            <CartItem :name="product.name" :picture="product.picture" :price="product.price" :path="product.path" :id="product.id"/>
        </n-list-item>
    </n-list>
    <div style="display: flex; margin-top: 2rem; justify-content: space-between;">
        <h2>
            Total: {{ total }} kr
        </h2>
        <n-button 
            ghost 
            round 
            @click="checkout(products)"
            :disabled="!checkoutStatus"
        >
            Checkout
        </n-button>
    </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
import { mapGetters, mapState } from "vuex";

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotalPrice'
        })
    },
    methods: {
        checkout (products) {}
    }
};
</script>