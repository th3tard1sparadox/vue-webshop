<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <n-message-provider>
    <n-space vertical>
      <n-layout style="height: 100vh; display: flex; flex-direction: column;">
        <n-layout-header bordered>
          <Header></Header>
        </n-layout-header>
        <div style="display: flex; justify-content: center; flex: 1 0 auto">
          <router-view />
        </div>
        <n-layout-footer bordered>
          hello
        </n-layout-footer>
      </n-layout>
    </n-space>
  </n-message-provider>
</template>

<style>
@import './assets/base.css';

#app {
  margin: 0 auto;
  font-weight: normal;
  height: 100%;
}

.n-layout-scroll-container {
  display: flex;
  flex-direction: column;
}
</style>
