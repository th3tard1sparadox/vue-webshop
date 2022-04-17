<script setup>
import ProductCard from "./ProductCard.vue";
</script>

<template>
    <n-grid :x-gap="30" :y-gap="30" :cols="5">
        <n-gi
            v-for="i in 30"
            :key="i"
        >
            <ProductCard />
        </n-gi>
    </n-grid>
</template>

<!-- TODO: fetch items from database -->
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            gridItemCount: ref(30) // TODO: use variable.
        };
    }
});
</script>

<style>
.n-grid {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 40px;
}
</style>