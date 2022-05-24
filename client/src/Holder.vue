
<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
        <App />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import App from './App.vue';
import { darkTheme } from 'naive-ui';
</script>