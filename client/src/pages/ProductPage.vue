<template>
    <n-grid cols="1 m:2" responsive="screen">
        <n-gi style="display: flex; align-items: flex-start; justify-content: center;">
            <n-image
                width="300"
                object-fit="scale-down"
                :src="product.picture"
                style="padding-bottom: 2rem;"
            />
        </n-gi>
        <n-gi>
            <n-h1>{{ product.name }}</n-h1>
            <n-h2>{{ product.price }} kr</n-h2>
            <n-button 
                ghost 
                round
                @click="addToCart()"
            >
                Add to cart
            </n-button>
            <n-button 
                ghost
                circle
                @click="favoriteItem" 
                style="margin-left: 1rem;"
            >
                <n-icon>
                    <Favorite />
                </n-icon>
            </n-button>
            <n-divider />
            <n-h3>{{ product.desc }}</n-h3>
        </n-gi>
    </n-grid>
</template>

<script>
import { Favorite } from "@vicons/carbon";
import { NIcon, useMessage } from "naive-ui";
import { defineComponent, h } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'ProductPage',
    components: {
        Favorite,
    },
    data: function() {
        return {
            product: {}
        }
    },
    methods: {
        addToCart() {
            this.$store.commit('addToCart', this.product);
            this.product.quantity = 1;
            this.$emit('addToCart', this.product);
        },
    },
    setup() {
        const message = useMessage();
        const router = useRouter();
        return {
            favoriteItem: async function(e) {
                message.error("Added to wishlist", {
                    icon: () => h(NIcon, null, { default: () => h(Favorite) })
                });
                e.preventDefault();
                const gResponse = await fetch("http://localhost:5000/add_to_wishlist", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(router.currentRoute._value.params.id),
                    credentials: 'include',
                    mode: 'cors'
                });
            }
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
        if(!gResponse.ok) {
            this.$router.replace('/404');
        }
        const gObject = await gResponse.json();
        this.product = gObject;
    }
})
</script>