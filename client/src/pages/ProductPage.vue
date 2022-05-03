<template>
    <n-grid :cols="2">
        <n-gi style="display: flex; align-items: flex-start; justify-content: center;">
            <n-image
                width="300"
                object-fit="scale-down"
                :src="product.picture"
            />
        </n-gi>
        <n-gi>
            <n-h1>{{ product.name }}</n-h1>
            <n-h2>{{ product.price }} kr</n-h2>
            <n-button 
                ghost 
                round
                @click="addProductToCart(product.id)"
            >
                Add to cart
            </n-button>
            <n-button 
                ghost
                circle
                @click="favoriteItem" 
                style="margin-left: 1rem;"
            >
                <n-icon>
                    <Favorite />
                </n-icon>
            </n-button>
            <n-divider />
            <n-h3>{{ product.desc }}</n-h3>
        </n-gi>
    </n-grid>
    <Cart />
</template>

<script>
import Cart from "./Cart.vue";
import { Favorite } from "@vicons/carbon";
import { mapActions } from "vuex";
export default {
    name: 'ProductPage',
    components: {
        Favorite,
        Cart
    },
    data: function() {
        return {
            product: {}
        }
    },
    methods: {
        ...mapActions('cart', [
            'addProductToCart'
        ]),
        favoriteItem: async function(e) {
            e.preventDefault();
            const gResponse = await fetch("http://localhost:5000/add_to_wishlist", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.$route.params.id),
                credentials: 'include',
                mode: 'cors'
            });
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.$route.params.id)
        });
        if(!gResponse.ok) {
            this.$router.replace('/404');
        }
        const gObject = await gResponse.json();
        this.product = gObject;
        this.$store.dispatch('products/getAllProducts');
    }
}
</script>