<template>
    <div style="display: flex; flex: 1 0 auto; flex-direction: column; justify-content: flex-start; align-items: center;">
        <h1>
            Email: {{ email }}
        </h1>
        <div style="flex-direction: row;">
            <n-input 
                round
                placeholder="cart id"
                v-model:value="cartId"
                style="margin-top: 2rem; max-width: 10rem;"
            ></n-input>
            <n-button 
                :disabled="$store.getters.groupCart != -1"
                ghost 
                round 
                @click="joinCart"
                style="margin-left: 1rem;"
            > Join cart</n-button>
        </div>
        <n-button 
            ghost 
            round 
            @click="openCart" 
            style="margin-top: 2rem;"
            :disabled="$store.getters.groupCart != -1"
        >
            Open group cart
        </n-button>
        <n-button ghost round type="error" @click="logout" style="margin-top: 2rem;">
            Log out
        </n-button>
    </div>
</template>

<script>
import NotFound from "./404.vue";

export default {
    name: "Profile",
    data: function() {
        return {
            email: '',
            cartId: ''
        }
    },
    methods: {
        joinCart: function(e) {
            this.$store.commit('clearCart');
            this.$emit('cartChange');
            this.$emit('joinGroup', this.cartId);
            this.$router.push('/cart');
        },
        openCart: function(e) {
            this.$store.commit('clearCart');
            this.$emit('cartChange');
            this.$emit('openCart');
            this.$router.push('/cart');
        },
        logout: async function(e) {
            const gResponse = await fetch("http://localhost:5000/logout", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
                
            });
            if(gResponse.ok) {
                this.$router.push('/');
            }
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/profile", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
            
        });
        if(!gResponse.ok) {
            this.$router.replace('/login');
        }
        const gObject = await gResponse.json();
        this.email = gObject['email'];
    },
    components: {
        NotFound
    }
}
</script>