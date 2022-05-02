<template>
    <n-grid :x-gap="30" :y-gap="30" cols="1 s:2 m:3 l:5" responsive="screen">
        <n-gi
            v-for="product in products"
        >
            <ProductCard :name="product.name" :picture="product.picture" :desc="product.desc" :price="product.price" :path="product.path" />
        </n-gi>
    </n-grid>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";

export default {
    components: {
        ProductCard
    },
    data: function() {
        return {
            products: []
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/products");
        if(!gResponse.ok) {
            this.$router.replace('/404');
        }
        const gObject = await gResponse.json();
        this.products = gObject;
    }
};
</script>

<style>
</style>