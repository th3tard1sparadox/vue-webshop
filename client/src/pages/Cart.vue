<template>
    <h1 style="margin-bottom: 2rem;">
        Cart overview:
    </h1>
    <n-list bordered>
        <n-list-item
            v-for="product in products"
            :key="product.id"
        >
            <CartItem :id="product.id" :startQuantity="product.quantity" @cartChange="updateCart" />
        </n-list-item>
    </n-list>
    <div style="display: flex; margin-top: 2rem; justify-content: space-between;">
        <h2>
            Total: {{ total }} kr
        </h2>
        <n-button 
            ghost 
            round 
        >
            Checkout
        </n-button>
    </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";

export default {
    data: () => ({
        products: [],
        total: 0
    }),
    components: {
        CartItem
    },
    created: function () {
        this.products = this.$store.getters.cartItems;
        this.total = this.$store.getters.total;
    },
    methods: {
        updateCart: function() {
            this.products = this.$store.getters.cartItems;
            this.total = this.$store.getters.total;
            this.$emit('cartChange');
        }
    }
};
</script>