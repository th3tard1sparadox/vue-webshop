<template>
    <n-card :title="name" hoverable @click="gotoPing">
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
        gotoPing: function (event) {
            this.$router.push('/ping')
        },
    },
    props: [
        'name',
        'picture',
        'desc',
        'price'
    ]
}
</script>

<style>
.n-card {
    max-width: 20rem;
}
</style>