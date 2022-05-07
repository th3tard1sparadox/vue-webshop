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
            <n-button 
                circle 
                size="small"
                type="error"
                ghost
                @click="removeFavorite"
                style="margin-top: 3px;"
            >
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
        productPage: function (e) {
            this.$router.push(this.path)
        },
        removeFavorite: async function(e) {
            e.preventDefault();
            const gResponse = await fetch("http://localhost:5000/remove_from_wishlist", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.id),
                credentials: 'include',
                mode: 'cors'
            });
            this.$emit('updateList');
        }
    },
    props: [
        'name',
        'picture',
        'price',
        'path',
        'id'
    ]
}
</script>