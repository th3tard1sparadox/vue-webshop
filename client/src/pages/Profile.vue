<template>
    <div style="display: flex; flex: 1 0 auto; flex-direction: column; justify-content: flex-start; align-items: center;">
        <h1>
            Email: {{ $store.getters.email }}
        </h1>
        <div v-if="$store.getters.groupCart == -1" style="display: flex; flex-direction: column; align-items: center;">
            <div style="flex-direction: row;">
                <n-input 
                    round
                    placeholder="cart id"
                    v-model:value="cartId"
                    style="margin-top: 2rem; max-width: 10rem;"
                ></n-input>
                <n-button 
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
            >
                Open group cart
            </n-button>
        </div>
        <div v-else style="display: flex; flex-direction: column; align-items: center;">
            <div style="display: flex; margin-top: 2rem;">
                <h2 >
                    In group cart {{ $store.getters.groupCart }}
                </h2>
                <h2 
                    v-if="$store.getters.userId == $store.getters.groupCart"
                    style="margin-left: 0.5rem;"
                >
                    (owner)
                </h2>
            </div>
            <n-button ghost round type="error" @click="exitGroup" style="margin-top: 2rem;">
                Exit cart
            </n-button>
        </div>
        <n-button ghost round type="error" @click="logout" style="margin-top: 2rem;">
            Log out
        </n-button>
    </div>
</template>

<script>
import { T } from "@vicons/carbon";
import NotFound from "./404.vue";

export default {
    name: "Profile",
    data: function() {
        return {
            cartId: ''
        }
    },
    methods: {
        joinCart: function(e) {
            this.$store.commit('clearCart');
            this.$emit('cartChange');
            this.$emit('joinGroup', this.cartId);
        },
        openCart: function(e) {
            this.$store.commit('clearCart');
            this.$emit('cartChange');
            this.$emit('openCart');
        },
        exitGroup: function(e) {
            this.$socket.client.emit('exitGroup', {
                user_id: this.$store.getters.userId,
                cart_id: this.$store.getters.groupCart
            });
            this.$store.commit('setGroupCart', -1);
            this.$store.commit('clearCart');
            this.$emit('cartChange');
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
                this.$store.commit('setUserId', -1);
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
    },
    components: {
        NotFound
    }
}
</script>