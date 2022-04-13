<template>
    <div class="ping">
        <p>{{ pong }}</p>
    </div>
</template>

<script>
export default {
    name: 'Ping',
    data: function(){
        return {
            pong: ''
        }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/ping");
        const gObject = await gResponse.json();
        this.pong = gObject;
    }
};
</script>