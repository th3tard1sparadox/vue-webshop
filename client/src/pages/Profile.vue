<template>
    <div style="display: flex; flex: 1 0 auto; flex-direction: column; justify-content: flex-start; align-items: center;">
        <h1>
            Email: {{ email }}
        </h1>
        <n-button tertiary round type="error" @click="logout" style="margin-top: 2rem;">
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
            email: ''
        }
    },
    methods: {
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
        console.log(gObject);
    },
    components: {
        NotFound
    }
}
</script>