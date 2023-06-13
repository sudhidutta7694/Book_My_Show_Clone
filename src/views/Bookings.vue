<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-800 p-96 h-screen">
  <div class="bg-slate-700 location-container">
    <h2 class="text-white font-semibold">Location Information</h2>

    <div v-if="loading" class=" text-green-200 loading-message">Loading...</div>

    <div v-else>
      <div v-if="error" class="error-message">{{ error }}</div>

      <div v-else-if="location">
        <div class="location-details">
          <div class="location-item">
            <span class="text-red-200 item-label">City:</span>
            <span class="text-gray-200 item-value">{{ location.city }}</span>
          </div>

          <div class="location-item">
            <span class="text-red-200 item-label">State:</span>
            <span class="text-gray-200 item-value">{{ location.region }}</span>
          </div>
        </div>
      </div>

    </div>
    <router-link class="text-green-200" :to="{ name: 'chosen', query: { languages: languages.join(',') } }">Go to Movies</router-link>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import languagesData from '/home/sudhi/Book_My_Show_Clone/src/components/languages.json';

export default {
  data() {
    return {
      location: null,
      loading: true,
      error: null,
      apiKey: 'f242c2d97d84a0f2c3f287db26198b93',
      languages: []
    };
  },
  mounted() {
    this.fetchLocation();
  },
  methods: {
    async fetchLocation() {
      try {
        const response = await axios.get('https://ipinfo.io/json?token=11314cc12c8406');
        this.location = response.data;
        this.loading = false;

        console.log('City:', this.location.city);
        console.log('State:', this.location.region);

        // Access the languages for the state
        const stateName = this.location.region;
        const state = languagesData.states.find(state => state.name === stateName);

        if (state) {
          this.languages = state.languages.map(language => language.code);
          console.log('Languages:', this.languages);
        } else {
          console.log('State not found.');
        }
      } catch (error) {
        this.error = 'Failed to fetch location.';
        console.error('Error:', error);
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.location-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.loading-message,
.error-message {
  margin-bottom: 20px;
  font-style: italic;
  text-align: center;
}

.location-details {
  display: flex;
  flex-direction: column;
}

.location-item {
  display: flex;
  margin-bottom: 10px;
}

.item-label {
  font-weight: bold;
  margin-right: 10px;
}

.item-value {
  flex-grow: 1;
}
</style>
