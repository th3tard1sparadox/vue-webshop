<template>
    <n-thing>
        <template #avatar>
            <n-avatar 
                :src="picture"
                size="large"
                @click="productPage"
            />
        </template>
        <template #header>
            {{ name }}
        </template>
        <template #header-extra>
            <n-button circle size="small">
                <template #icon>
                    <TrashCan />
                </template>
            </n-button>
        </template>
        <template #description>
            {{ price }} kr
        </template>
    </n-thing>
</template>

<script>
import { TrashCan } from "@vicons/carbon"; 

export default {
    components: {
        TrashCan
    },
    methods: {
        productPage: function (event) {
            this.$router.push(this.path)
        },
    },
    props: [
        'name',
        'picture',
        'price',
        'path'
    ]
}
</script>