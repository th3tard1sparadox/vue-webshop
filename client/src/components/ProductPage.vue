<template>
    <n-grid :cols="2">
        <n-gi>
            <n-image
                width="500"
                :src="product.picture"
            />
        </n-gi>
        <n-gi>
            <n-h1>{{ product.name }}</n-h1>
            <n-h2>{{ product.price }} kr</n-h2>
            <n-button type="primary">Add to cart</n-button>
            <n-divider />
            <n-h2>{{ product.desc }}</n-h2>
        </n-gi>
    </n-grid>
</template>

<script>
export default {
    name: 'ProductPage',
    data: function() {
        return {
            product: {}
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.$route.params.id)
        });
        const gObject = await gResponse.json();
        this.product = gObject;
    }
}
</script>