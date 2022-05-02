<template>
    <n-list bordered>
        <n-list-item
            v-for="product in products"
        >
            <WishlistItem :name="product.name" :picture="product.picture" :price="product.price" :path="product.path" />
        </n-list-item>
    </n-list>
</template>

<script>
import WishlistItem from "../components/WishlistItem.vue";

export default {
    components: {
        WishlistItem
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