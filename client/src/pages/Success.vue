<template>
  <n-result status="success" title="The order was placed successfully">
  </n-result>
</template>

<script>
export default {
    created: function () {
        this.$store.commit('clearCart');
        this.$emit('cartChange');
    },
};
</script>