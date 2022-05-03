<template>
    <h1 style="margin-bottom: 2rem;">
        Cart overview:
    </h1>
    <n-list bordered>
        <n-list-item
            v-for="product in products"
        >
            <CartItem :name="product.name" :picture="product.picture" :price="product.price" :path="product.path" :id="product.id"/>
        </n-list-item>
    </n-list>
    <n-button style="align-self: flex-end; margin-top: 2rem;">
        Checkout
    </n-button>
</template>

<script>
import CartItem from "../components/CartItem.vue";

export default {
    components: {
        CartItem
    },
    data: function() {
        return {
            products: []
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/wishlist", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
            
        });
        if(!gResponse.ok) {
            this.$router.replace('/login');
        }
        const gObject = await gResponse.json();
        this.products = gObject;
    }
};
</script>