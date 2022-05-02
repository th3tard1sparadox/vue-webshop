<script setup>
import Header from './components/Header.vue';
import { darkTheme } from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-space vertical>
        <n-layout style="height: 100vh; display: flex; flex-direction: column;">
          <n-layout-header bordered>
            <Header></Header>
          </n-layout-header>
          <div style="display: flex; flex: 1 0 auto; padding: 2rem; flex-direction: column; justify-content: flex-start;">
            <router-view />
          </div>
          <n-layout-footer bordered>
            hello
          </n-layout-footer>
        </n-layout>
      </n-space>
    </n-message-provider>
  </n-config-provider>
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
