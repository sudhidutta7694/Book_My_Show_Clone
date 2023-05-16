<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <Headers />
    <!-- <LoginComponent /> -->
    <Router-view />
  </div>
</template>

<script>
import Headers from './components/Headers.vue';
// import LoginComponent from './components/Login.vue';

export default {
  name: 'App',
  components: {
  
    Headers,
    // LoginComponent,
  },
};
</script>
