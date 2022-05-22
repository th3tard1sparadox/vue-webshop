<template>
    <n-spin :show="processing">
        <h1 style="margin-bottom: 2rem;">
            Cart overview:
        </h1>
        <n-list bordered>
            <n-list-item
                v-for="product in products"
                :key="product.id"
            >
                <CartItem :id="product.id" :startQuantity="product.quantity" @removeFromCart="removeFromCart" @addToCart="addToCart" />
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
    </n-spin>
</template>

<script>
import { ref } from 'vue';
import CartItem from "../components/CartItem.vue";
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
    data: () => ({
        products: [],
        total: 0,
        stripe: null,
        processing: ref(false)
    }),
    components: {
        CartItem,
        StripeCheckout,
    },
    created: function () {
        this.processing = this.$store.getters.checkout == true;
        console.log(this.processing);
        this.products = this.$store.getters.cartItems;
        this.total = this.$store.getters.total;
        this.getStripePublishableKey();
    },
    methods: {
        removeFromCart(i) {
            console.log('remove in Cart.vue')
            this.products = this.$store.getters.cartItems;
            this.total = this.$store.getters.total;
            this.$emit('removeFromCart', i);
        }, 
        addToCart(i) {
            this.products = this.$store.getters.cartItems;
            this.total = this.$store.getters.total;
            this.$emit('addToCart', i);
        }, 
        checkout: async function() {
            this.$store.commit('setCheckout', true);
            this.processing = this.$store.getters.checkout == true;
            if(this.$store.getters.groupCart != -1) {
                this.$socket.client.emit('checkoutCart', {
                    cart_id: this.$store.getters.groupCart
                });

            }
            this.$store.commit('setPayed');
            const gResponse = await fetch("http://localhost:5000/create-checkout-session", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.$store.getters.cartItems),
                mode: 'cors'
            })
                .then((result) => {
                    if(!result.ok){
                        this.$router.push('/cancel');
                    }
                    return result.json();
                })
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