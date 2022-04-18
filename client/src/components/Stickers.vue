<template>
    <n-grid :x-gap="30" :y-gap="30" :cols="5">
        <n-gi
            v-for="product in products"
        >
            <ProductCard :name="product.name" :picture="product.picture" :desc="product.desc" :price="product.price" :path="product.path" />
        </n-gi>
    </n-grid>
</template>

<!-- TODO: fetch items from database -->
<script>
import ProductCard from "./ProductCard.vue";

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
        const gObject = await gResponse.json();
        this.products = gObject;
    }
};
</script>

<style>
.n-grid {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 40px;
}
</style>