<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header bordered>
        <Header></Header>
      </n-layout-header>
      <router-view />
      <n-layout-footer bordered>
        hello
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<style>
@import './assets/base.css';

#app {
  margin: 0 auto;
  font-weight: normal;
  height: 100%;
}
</style>
