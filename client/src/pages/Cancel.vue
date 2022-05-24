<template>
  <n-result status="error" title="The order was cancelled" >
  </n-result>
</template>

<script>
export default {
  created: function () {
    this.$store.commit('setCheckout', false);
    this.$store.commit('unsetPayed');
  }
}
</script>