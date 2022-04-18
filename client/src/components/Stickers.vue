<template>
    <n-grid :x-gap="30" :y-gap="30" :cols="5">
        <n-gi
            v-for="i in 30"
            :key="i"
        >
            <ProductCard :name="item.name" :picture="item.picture" :desc="item.desc" :price="item.price" />
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
    data() {
        return {
            item: {
                name: "item name",
                picture: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
                desc: "hello this is item desc",
                price: 150
            }
        }
    }
}
</script>

<style>
.n-grid {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 40px;
}
</style>