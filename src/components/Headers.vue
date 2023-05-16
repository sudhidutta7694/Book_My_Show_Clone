<!-- eslint-disable vue/multi-word-component-names -->
<template>
<nav class="bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6 md:py-8">
            <div class="flex items-center">
                <router-link to="/home" class="flex items-center mr-6">
                  <img class="w-[20vw] md:w-[12vw] lg:w-[8vw] lg:h-[7vh] mx-4" src="../../favicon.ico" alt="Logo" />

                </router-link>
                <div class="hidden md:block">
                    <router-link to="/home" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Movies
                    </router-link>
                    <router-link to="/genres" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Genres
                    </router-link>
                    <router-link to="/actors" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Actors
                    </router-link>
                </div>
            </div>
            <div class="flex items-center">
                <form class="relative mr-6">
                    <input type="text" placeholder="Search here" v-model="searchQuery" @input="searchMovies" class="border border-gray-300 hover:bg-gray-400 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300" />
                    <button type="submit" class="absolute right-0 top-0 bottom-0 px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </button>
                    <div v-if="searchResultsWithPoster.length > 0 && visible" class="cursor-pointer lg:absolute mx-1 mt-1 ml-2 rounded-xl bg-gray-300 overflow-y-auto max-h-96">
                        <ul>
                            <li v-for="movie in searchResultsWithPoster" :key="movie.id" class="flex opacity-90 hover:bg-gray-400 gap-3 hover:opacity-100 items-center p-2 pb-3 w-64" @click="logMovieId(movie.id)">
                            <router-link :to="{ name: 'overview', params: { id: movie.id } }">
                                <div class="flex gap-3">
                                    <img class="rounded-lg w-10" :src="getMoviePosterURL(movie.poster_path)" />
                                    <span class="text-gray-700 hover:text-gray-800">{{ movie.title }}</span>
                                </div>
                            </router-link>
                          </li> 
                        </ul>
                      </div>                     
                </form>
                <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <!-- <router-link to="/login" class="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-4">
                  Login
                </router-link> -->
                <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
                <div class="flex shadow-xl justify-center items-center cursor-pointer p-3 gap-3 rounded-xl opacity-90 bg-slate-700 text-red-700 hover:opacity-100">
                  <!-- <div class="w-10 h-10 flex justify-center items-center flex-shrink-0" /> -->
                  <div class="rounded-full p-3 bg-slate-600 hover:drop-shadow-lg"><span class="far fa-user text-gray-200"></span></div>
                  <div class="font-mono text-lg font-bold">{{ store.username }}</div>
                  </div>
                <!-- <router-link to="/" class="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-4">
                 Register
              </router-link> -->
            </div>
        </div>
    </div>
    <div class="md:hidden bg-gray-900">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <router-link to="/" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Movies
            </router-link>
            <router-link to="/genres" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Genres
            </router-link>
            <router-link to="/actors" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Actors
            </router-link>
        </div>
    </div>
</nav>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from "../store"

const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';

export default {
  name: 'Movies',
  props: ['username'],
  data() {
    return {
        visible: true,
    }
  },
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const router = useRouter();
    const store = useStore()
    const searchMovies = async () => {
      if (searchQuery.value.trim() === '') {
        searchResults.value = [];
        return;
      }

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery.value}`);
        searchResults.value = response.data.results;
      } catch (error) {
        console.error(error);
      }
    };

    const getMoviePosterURL = (posterPath) => {
      if (!posterPath) {
        return ''; // Return a default image or placeholder if no poster path is available
      }
      return `https://image.tmdb.org/t/p/w200${posterPath}`;
    };

    const searchResultsWithPoster = computed(() => {
      return searchResults.value.filter(movie => movie.poster_path);
    });

    return {
      searchQuery,
      searchResults,
      searchMovies,
      getMoviePosterURL,
      searchResultsWithPoster,
      router,
      store
    };
  },
  methods: {
    logMovieId(movieId) {
      console.log(movieId);
      this.visible = !this.visible;
      this.searchQuery = '';
      this.router.push(`/overview/${movieId}`)
    },
  }
};
</script>
 
  
<style scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
.navbar {
    background-color: #141414;
}

.navbar a:hover {
    text-decoration: underline;
}

.nav-link-active {
    font-weight: bold;
}
</style>
