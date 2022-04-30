<template>
    <div>
        <p>{{ user }}</p>
    </div>
</template>

<script>
import NotFound from "./404.vue";

export default {
    name: "Profile",
    data: function() {
        return {
            user: ''
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
        const gObject = await gResponse.json();
        console.log(gObject);
    },
    components: {
        NotFound
    }
}
</script>