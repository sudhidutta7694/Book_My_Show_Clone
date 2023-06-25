<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="bg-gray-900 rounded-b-2xl">
    <div class="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-around items-center py-2 sm:py-4 md:py-6 lg:py-8">
        <div class="flex items-center justify-around">
          <router-link v-if="isMenuOpen" to="/home" class=" md:ml-[-100px] flex items-center mr-6">
            <img class="h-8 sm:h-12 md:h-20" src="../public/favicon.ico" alt="Logo" />
          </router-link>
          <div v-if="isMenuOpen" class="w-full block md:hidden bg-gray-900">
            <div class="flex justify-around w-full">
              <router-link to="/home" class="text-red-300 hover:text-white px-2 py-1 rounded-md text-sm font-serif"
                @click="isMenuOpen = false">
                Home
              </router-link>
              <router-link to="/movies" class="text-red-300 hover:text-white px-2 py-1 rounded-md text-sm font-serif"
                @click="isMenuOpen = false">
                Movies
              </router-link>
              <router-link to="/bookings" class="text-red-300 hover:text-white px-2 py-1 rounded-md text-sm font-serif"
                @click="isMenuOpen = false">
                Bookings
              </router-link>
            </div>
          </div>

          <div class="hidden md:block">
            <router-link to="/home"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Home
            </router-link>
            <router-link to="/movies"
              class="text-red-100 hover:text-red-200 px-3 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Movies
            </router-link>
            <router-link to="/bookings"
              class="text-red-100 hover:text-red-200 px-2 py-2 rounded-md text-md md:text-lg font-sans transition-colors duration-300"
              active-class="text-white bg-gray-800">
              Bookings
            </router-link>
          </div>
        </div>
        <div>
          <form v-if="windowWidth >= 1400" class="relative mr-6" @submit.prevent="routeTo">
            <input type="text" placeholder="Search here" v-model="searchQuery" @input="searchMovies"
              class="border w-32 md:w-64 border-red-300 text-sm md:text-lg bg-slate-700 text-red-200 hover:bg-slate-800 rounded-full py-2 px-2 md:py-2 md:px-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors duration-300" />
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
                  <div class="flex justify-center items-center gap-3">
                    <img class="rounded-xl border border-red-300 hover:border-red-400 w-10"
                      :src="getMoviePosterURL(movie.poster_path)" />
                    <span class="text-red-100 font-serif hover:text-red-200">{{ movie.title }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="isMenuOpen" class="flex flex-col">
          <div @click="isLogout = !isLogout"
            :class="{ 'rounded-xl': !isLogout, 'rounded-t-xl': isLogout && windowWidth <= 1400 }"
            class="flex shadow-xl justify-center items-center cursor-pointer p-1 sm:p-2 md:p-3 gap1 sm:gap-2 md:gap-3 opacity-90 bg-slate-700 font-bold text-sm sm:text-md lg:text-lg xl:text-xl text-red-200 hover:opacity-100 lg:scale-110">
            <div class="rounded-full w-6 sm:w-8 md:w-10  bg-slate-600 hover:shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
              <img v-if="userImage.length > 0" :src="userImage" alt="" class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full" />
              <i v-else class="w-6 sm:w-8 md:w-10 rounded-full far fa-user-circle"></i>
            </div>
            <div class="font-serif text-sm sm:text-md md:text-lg font-bold">{{ windowWidth <= 780 ? "" : store.username }}
                    </div>
                  </div>
                  <router-link to="/login">
                <div v-if="isLogout && windowWidth <= 1400"
                  class=" bg-slate-700 py-1 text-center text-red-400 rounded-b-xl px-3 font-serif hover:opacity-100 hover:text-red-300 text-sm sm:text-md md:text-lg ">
                  Logout
                </div>
                </router-link>
            </div>
            <router-link to="/login" v-if="windowWidth >= 1400" @click="logout"
              class="bg-gray-800  px-1 sm:px-2 md:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-md md:text-lg font-mono transition-colors text-red-200 hover:text-red-300 duration-300 ml-4">
              Logout
            </router-link>
          </div>
        </div>

  </nav>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';

export default {

  setup() {
    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };
    const isLogout = ref('false');
    const searchQuery = ref('');
    const searchResults = ref([]);
    const router = useRouter();
    const isMenuOpen = ref('false')
    const store = useStore();
    const storedUsername = ref('');
    const auth = getAuth();
    const db = getFirestore();

    const getFirestoreUsername = async (uid, setUserImage) => {
      try {
        const userDoc = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          storedUsername.value = userData.username;
          store.setUsername(userData.username, uid);

          // Get the user's photoURL from the Google account
          const user = auth.currentUser;
          if (user) {
            const photoURL = user.photoURL;
            if (photoURL) {
              setUserImage(photoURL);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
   

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      // Listen for changes in the user's authentication state
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid } = user;
          getFirestoreUsername(uid, store.setUserImage);
        }
      });
    });

    const userImage = computed(() => {
      return store.getUserImage();
    });
    console.log(userImage);

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
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
      windowWidth,
      searchQuery,
      searchResults,
      searchMovies,
      getMoviePosterURL,
      isMenuOpen,
      searchResultsWithPoster,
      logMovieId,
      router,
      store,
      userImage,
      storedUsername,
      logout,
      isLogout,
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
  