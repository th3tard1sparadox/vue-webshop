<template>
  <n-result status="success" title="The order was placed successfully">
  </n-result>
</template>

<script>
export default {
    created: function () {
        this.decrease_stock();
    },
    methods: {
        decrease_stock: async function () {
            this.$store.commit('setCheckout', false);
            if(this.$store.getters.payedStatus) {
                const gResponse = await fetch("http://localhost:5000/decrease_stock", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.$store.getters.cartItems),
                    mode: 'cors'
                });
                if(gResponse.ok) {
                    this.$store.commit('clearCart');
                    this.$emit('cartChange');
                } else {
                    this.$router.push('/cancel');
                }
                this.$store.commit('unsetPayed');
            }
        }
    }
};
</script>