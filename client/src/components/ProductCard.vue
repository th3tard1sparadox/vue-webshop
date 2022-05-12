<template>
    <n-card :title="name" hoverable @click="productPage">
        <template #cover>
            <img :src="picture">
        </template>
        {{ desc }}
        <template #footer>
            {{ price }} kr
        </template>
    </n-card>
</template>

<script>
export default {
    name: 'ProductCard',
    methods: {
        productPage: function (event) {
            this.$router.push(this.path)
        },
    },
    props: [
        'name',
        'picture',
        'desc',
        'price',
        'path'
    ]
}
</script>

<style>
.n-card {
    max-width: 20rem;
}
</style>