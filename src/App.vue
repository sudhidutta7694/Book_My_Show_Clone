<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Headers from './components/Headers.vue';

const isLoading = ref(true);

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false; // Set isLoading to false after the delay to hide the loading GIF
  }, 2000); // Adjust the delay time as needed
});
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <img src="../public/loading.gif" alt="Loading" />
    </div>
    <Headers v-else />
    <Router-view v-if="!isLoading" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    RouterView,
    Headers,
  },
};
</script>
