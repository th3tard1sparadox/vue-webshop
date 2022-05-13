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
            @click="checkout"
        >
            Checkout
        </n-button>
    </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
    data: () => ({
        products: [],
        total: 0,
        stripe: null,
    }),
    components: {
        CartItem,
        StripeCheckout,
    },
    created: function () {
        this.products = this.$store.getters.cartItems;
        this.total = this.$store.getters.total;
        this.getStripePublishableKey();
    },
    methods: {
        updateCart: function() {
            this.products = this.$store.getters.cartItems;
            this.total = this.$store.getters.total;
            this.$emit('cartChange');
        }, 
        checkout: async function() {
            const gResponse = await fetch("http://localhost:5000/create-checkout-session", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.$store.getters.cartItems),
                mode: 'cors'
            })
                .then((result) => result.json())
                .then((data) => {
                    return this.stripe.redirectToCheckout({ sessionId: data.sessionId });
                });
        },
        getStripePublishableKey: async function() {
            fetch('http://localhost:5000/get_key', {
                method: 'GET'
            })
                .then((result) => result.json())
                .then((data) => {
                this.stripe = Stripe(data.publicKey);
                });
        },
    }
};
</script>