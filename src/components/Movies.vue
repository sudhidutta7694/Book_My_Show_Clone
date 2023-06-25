<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="loading" class="bg-gray-900 min-h-screen flex justify-center items-center">
    <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading ...">
  </div>
  <div class="bg-slate-800 p-2 pt-20 sm:pt-40 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    <div
      class="flex flex-col justify-stretch gap-3 pb-1 items-center bg-slate-700 rounded-xl hover:opacity-70 transition-all ease-in duration-300"
      v-for="movie in movies" :key="movie.id" @click="handleMovieClick(movie.id)">
      <div class="relative">
        <router-link :to="{ name: 'overview', params: { id: movie.id } }"><img :src="getImageUrl(movie.poster_path)"
            :alt="movie.title" class="rounded-lg shadow-lg"></router-link>
      </div>
      <div class="text-center">
        <h3 class="text-red-200 text-xl font-serif font-semibold">{{ movie.title }}</h3>
        <p class="text-gray-200 font-mono text-lg">IMDB Rating: {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getFirestore, collection, setDoc, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from '@/store';

export default {
  setup() {
    const favorites = ref([]);
    const movies = ref([]);
    const loading = ref(true);
    const db = getFirestore(); // Initialize the Firestore database

    async function favoriteMovie(movieId) {
      const { uid } = useStore(); // Get the Pinia store instance
      const user = uid;
      const db = getFirestore(); // Access the Firestore instance

      if (user) {
        try {
          const favoritesData = {
            movieId: movieId
          };

          const favoritesCollectionRef = collection(db, 'users', user, 'favorites');
          const favoriteDocRef = doc(favoritesCollectionRef, movieId.toString());

          // Check if the movie is already favorited
          const favoriteDocSnapshot = await getDoc(favoriteDocRef);
          if (favoriteDocSnapshot.exists() && favoriteDocSnapshot.data().movieId === movieId) {
            // Movie is already favorited, remove it from favorites
            await deleteDoc(favoriteDocRef);
            favorites.value = favorites.value.filter(id => id !== movieId);
          } else {
            // Movie is not favorited, add it to favorites
            await setDoc(favoriteDocRef, favoritesData);
            favorites.value.push(movieId);
          }

          // Update the favorites in the Pinia store
          const store = useStore();
          store.updateFavorites(favorites.value);
        } catch (error) {
          console.error('Error updating favorite movie:', error);
        }
      } else {
        // User is not logged in, prompt them to log in
        alert('Please log in to add movies to your favorites.');
      }
    }





    // Fetch popular movies
    async function fetchPopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&page=1&total_pages=1000`
        );
        const data = await response.json();
        movies.value = data.results;
        loading.value = false;
        console.log(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }

    onMounted(fetchPopularMovies);

    const getImageUrl = (posterPath) => {
      if (!posterPath) {
        return 'https://via.placeholder.com/500x750.png?text=No+Image';
      }
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    };

    const handleMovieClick = (movie) => {
      console.log('Clicked movie:', movie);
    };

    // Fetch favorite movies for the authenticated user
    const fetchFavoriteMovies = (userId) => {
      const favoritesCollectionRef = collection(db, `users/${userId}/favorites`);
      onSnapshot(favoritesCollectionRef, (querySnapshot) => {
        const favoritesData = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const favoriteData = doc.data();
            favoritesData.push(favoriteData.movieId);
          }
        });
        favorites.value = favoritesData; // Update the favorites ref with the retrieved data
        console.log('Favorites retrieved successfully!\nFavorites:', favorites.value);
      });
    };

    // Handle authentication state changes
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          fetchFavoriteMovies(userId);
        }
      });
    });

    return {
      favorites,
      movies,
      loading,
      favoriteMovie,
      getImageUrl,
      handleMovieClick
    };
  }
};
</script>


<style scoped>

.favorite-icon {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.favorite-icon .fa {
  font-size: 20px;
  color: red;
  transition: all 0.3s ease-out;
}

.favorite-icon .fa.fas {
  font-size: 22px;
  color: red;
}

.favorite-icon .fa.far {
  color: rgba(255, 255, 255, 0.8);
}

.favorite-icon:hover .fa.far {
  color: red;
}
</style>