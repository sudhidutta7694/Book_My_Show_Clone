<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-800 p-96 h-screen flex gap-24  flex-col-reverse justify-center items-center">
    <div>
      <p class="text-xl mb-6 font-bold text-red-400">Recent Bookings:-</p>
      <TableComponent class="bg-white" :bookingData="bookingData" />
    </div>
    <div class="bg-slate-700 location-container p-6 w-96 rounded-xl">
      <h2 class="text-white font-semibold mb-6 text-center text-2xl">Location Information</h2>

      <div v-if="loading" class="text-green-200 loading-message">Loading...</div>

      <div v-else>
        <div v-if="error" class="error-message">{{ error }}</div>

        <div v-else-if="location" class="flex flex-col gap-3">
          <div class="location-details text-xl">
            <div class="location-item">
              <span class="text-red-200 item-label">City: </span>
              <span class="text-gray-200 item-value">{{ location.city }}</span>
            </div>

            <div class="location-item text-xl">
              <span class="text-red-200 item-label">State: </span>
              <span class="text-gray-200 item-value">{{ location.region }}</span>
            </div>
          </div>

          <router-link class="text-green-200" :to="getRouterLink">Go to Movies</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue';
import { db, auth } from '@/firebase.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import languagesData from '../components/languages.json';

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      bookingData: null,
      location: null,
      loading: true,
      error: null,
      apiKey: 'f242c2d97d84a0f2c3f287db26198b93',
      languages: [],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const bookingRef = doc(db, `users/${userId}/booking`, 'bookingData');
        onSnapshot(bookingRef, (doc) => {
          if (doc.exists()) {
            this.bookingData = doc.data();
            console.log("Booking data retrieved succesfully!")
          } else {
            this.bookingData = null;
            alert("Unable to retrieve Booking data")
          }
        });
      }
    });
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
  },
  computed: {
    getRouterLink() {
      if (this.location) {
        return {
          name: 'chosen',
          query: {
            languages: this.languages.join(','),
            city: this.location.city,
            state: this.location.region
          }
        };
      }
      return null;
    }
  }
};
</script>

<style scoped>
/* Styles go here */
</style>
