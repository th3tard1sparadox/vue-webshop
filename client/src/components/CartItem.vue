
<template>
    <n-thing>
        <template #avatar>
            <n-avatar 
                :src="product.picture"
                size="large"
                @click="productPage"
            />
        </template>
        <template #header>
            {{ product.name }}
        </template>
        <template #header-extra>
            <div style="display: flex;">
                <n-input-number 
                    v-model:value="quantity"
                    @update:value="setItemQuantity"
                    :min="0"
                    style="max-width: 6rem; margin-right: 1rem;"
                />
                <n-button 
                    circle 
                    size="small"
                    type="error"
                    ghost
                    @click="removeProduct"
                    style="margin-top: 3px;"
                >
                    <template #icon>
                        <TrashCan />
                    </template>
                </n-button>
            </div>
        </template>
        <template #description>
            {{ product.price * quantity }} kr
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
            product: {},
            quantity: this.startQuantity
        }
    },
    methods: {
        setItemQuantity(v) {
            this.$store.commit('setToCart', {product: this.product, amount: v});
            this.$emit('cartChange');
        },

        removeProduct() {
            this.$store.commit('removeCart', this.product);
            this.$emit('cartChange');
        },

        productPage: function (e) {
            this.$router.push(this.path)
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.id)
        });
        const gObject = await gResponse.json();
        this.product = gObject;
    },
    props: [
        'id',
        'startQuantity'
    ]
}
</script>