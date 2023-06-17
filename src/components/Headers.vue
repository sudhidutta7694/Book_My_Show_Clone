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
            <router-link to="/home"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Home
            </router-link>
            <router-link to="/movies"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Movies
            </router-link>
            <router-link to="/bookings"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Bookings
            </router-link>
          </div>
        </div>
        <div>
          <form class="relative mr-6" @submit.prevent="routeTo">
            <input type="text" placeholder="Search here" v-model="searchQuery" @input="searchMovies"
              class="border border-red-300 bg-slate-700 text-red-200 hover:bg-slate-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors duration-300" />
            <button type="submit"
              class="absolute right-0 top-0 bottom-0 px-4 py-2 text-red-400 hover:text-red-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
            </button>
          </form>

          <div v-if="searchResultsWithPoster.length > 0"
            class="cursor-pointer absolute mt-2 ml-[-20px] rounded-2xl bg-slate-700 overflow-y-auto max-h-96">
            <ul>
              <li v-for="movie in searchResultsWithPoster" :key="movie.id"
                class="flex opacity-90 hover:bg-slate-800 gap-3 hover:opacity-100 items-center p-2 pb-3 w-64"
                @click="logMovieId(movie.id)">
                <router-link :to="{ name: 'overview', params: { id: movie.id } }">
                  <div class="flex gap-3">
                    <img class="rounded-lg w-10" :src="getMoviePosterURL(movie.poster_path)" />
                    <span class="text-red-100 hover:text-red-200">{{ movie.title }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none"
          @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none"
          @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div
          class="flex shadow-xl justify-center items-center cursor-pointer p-3 gap-3 rounded-xl opacity-90 bg-slate-700 font-bold text-xl text-red-200 hover:opacity-100">
          <div class="rounded-full p-3 bg-slate-600 hover:drop-shadow-lg"><span class="far fa-user text-red-200"></span>
          </div>
          <div class="font-serif text-lg font-bold">{{ store.username }}</div>
        </div>
        <router-link to="/login" @click="logout"
          class="bg-gray-800 px-3 py-2 rounded-md text-lg font-mono  transition-colors text-red-200 hover:text-red-300 duration-300 ml-4">
          Logout
        </router-link>
      </div>
    </div>
    <div class="md:hidden bg-gray-900">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/home" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Movies
        </router-link>
        <router-link to="/movies" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Genres
        </router-link>
        <router-link to="/bookings"
          class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          Bookings
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';

export default {
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const router = useRouter();
    const store = useStore();
    const storedUsername = ref('');
    const auth = getAuth();
    const db = getFirestore();

    const getFirestoreUsername = async (uid) => {
      try {
        const userDoc = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          storedUsername.value = userData.username;
          store.setUsername(userData.username, uid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      // Listen for changes in the user's authentication state
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid } = user;
          getFirestoreUsername(uid);
        }
      });
    });

    const searchMovies = async () => {
      if (searchQuery.value.trim() === '') {
        searchResults.value = [];
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery.value}`
        );
        searchResults.value = response.data.results;
      } catch (error) {
        console.error(error);
      }
    };

    const getMoviePosterURL = (posterPath) => {
      if (!posterPath) {
        return '';
      }
      return `https://image.tmdb.org/t/p/w200${posterPath}`;
    };

    const searchResultsWithPoster = computed(() => {
      return searchResults.value.filter((movie) => movie.poster_path);
    });

    const logMovieId = (movieId) => {
      console.log(movieId);
      router.push(`/overview/${movieId}`);
    };

    const logout = async () => {
      try {
        await auth.signOut();
        // store.clearUsername(storedUsername.value)
        localStorage.removeItem('username');
        router.push('/login');
      } catch (error) {
        console.error(error);
      }
    };

    const routeTo = async () => {
      const movieName = searchQuery.value; // Get the movie name from the search query
      if (!movieName) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            movieName
          )}`
        );
        const movies = response.data.results;
        if (movies.length > 0) {
          const movieId = movies[0].id; // Get the ID of the first movie in the search results
          router.push({ name: 'overview', params: { id: movieId } });
          searchQuery.value = "";
        } else {
          console.log('Movie not found');
        }
        searchQuery.value = "";
        searchResults.value = [];
      } catch (error) {
        console.error(error);
      }
    };


    return {
      searchQuery,
      searchResults,
      searchMovies,
      getMoviePosterURL,
      searchResultsWithPoster,
      logMovieId,
      router,
      store,
      storedUsername,
      logout,
      routeTo, // Include the routeTo function in the return object
    };
  },
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
  