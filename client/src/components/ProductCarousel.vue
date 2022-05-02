<template>
    <n-carousel
        effect="card"
        prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
        next-slide-style="transform: translateX(50%) translateZ(-800px);"
        style="height: 30rem"
        autoplay
        draggable
    >
        <n-carousel-item 
            :style="{ width: '60%' }"
            v-for="product in products"
            @click="this.$router.push(product.path)"
        >
            <img
                class="carousel-img"
                :src="product.picture"
            >
        </n-carousel-item>
    </n-carousel>
</template>

<script>
export default {
    name: "ProductCarousel",
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
.carousel-img {
  margin: 0 auto;
  height: 100%;
  object-fit: cover;
}
</style>