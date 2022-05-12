<template>
    <div style="display: flex; flex: 1 0 auto; flex-direction: column; justify-content: flex-start; align-items: center;">
        <h1>Shop our stickers!</h1>
        <ProductCarousel style="margin-top: 2rem;"/>
    </div>
</template>

<script>
import ProductCarousel from '../components/ProductCarousel.vue';

export default {
    name: "Home",
    components: {
        ProductCarousel
    }
}
</script>