<template>
    <div class="ping">
        <p>{{ pong }}</p>
    </div>
</template>

<script>
export default {
    name: 'Ping',
    data: function() {
        return {
            pong: ''
        }
    },
    created: async function() {
        const gResponse = await fetch("http://localhost:5000/ping");
        if(!gResponse.ok) {
            this.$router.replace('/404');
        }
        const gObject = await gResponse.json();
        this.pong = gObject;
    }
};
</script>