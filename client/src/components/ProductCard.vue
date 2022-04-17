<template>
    <n-card title="item name" hoverable @click="gotoPing">
        <template #cover>
            <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
        </template>
        item description
        <template #footer>
            price
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
    }
}
</script>

<style>
.n-card {
    max-width: 20rem;
}
</style>