
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
            <div style="display: flex;">
                <n-input-number 
                    v-model:value="value"
                    :min="1"
                    style="max-width: 6rem; margin-right: 1rem;"
                />
                <n-button 
                    circle 
                    size="small"
                    type="error"
                    tertiary
                    @click="removeFavorite"
                    style="margin-top: 3px;"
                >
                    <template #icon>
                        <TrashCan />
                    </template>
                </n-button>
            </div>
        </template>
        <template #description>
            {{ price * value }} kr
        </template>
    </n-thing>
</template>

<script>
import { TrashCan } from "@vicons/carbon"; 

export default {
    components: {
        TrashCan
    },
    data: function() {
        return {
            value: 1
        }
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
            this.$router.go();
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