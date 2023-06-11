<template>
  <div v-if="loading" class="bg-gray-900 flex justify-center items-center">
    <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading ...">
  </div>
  <div class="bg-slate-800 content p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
    <div
      class="flex flex-col justify-center items-center bg-slate-700 rounded-xl hover:opacity-70 transition-all ease-in-out duration-400"
      v-for="movie in movies" :key="movie.id" @click="handleMovieClick(movie.id)">
      <div class="relative">
        <router-link :to="{ name: 'overview', params: { id: movie.id } }"><img :src="getImageUrl(movie.poster_path)"
            :alt="movie.title" class="rounded-lg shadow-lg"></router-link>
        <div class="favorite-icon" @click="favoriteMovie(movie.id)" :class="{ clicked: favorites.includes(movie.id) }">
          <i class="fa"
            :class="['fa-heart', { 'fas': favorites.includes(movie.id), 'far': !favorites.includes(movie.id) }]"></i>
        </div>
      </div>
      <div class="mt-4 text-center">
        <h3 class="text-gray-100 text-lg font-semibold">{{ movie.title }}</h3>
        <p class="text-gray-300">IMDB Rating: {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      movies: [],
      loading: true,
      favorites: [] // Array to store the favorite movie IDs
    };
  },
  async mounted() {
    const store = useStore(); // Get the Pinia store instance

    const auth = getAuth();
    const db = getFirestore();

    // Check if a user is logged in
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is logged in, fetch their favorite movies
        this.fetchFavoriteMovies(user.uid, db);
      } else {
        // User is not logged in, clear the favorites array
        this.favorites = [];
      }
    });

    // Fetch popular movies
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&page=1&total_pages=1000`
      );
      const data = await response.json();
      this.movies = data.results;
      this.loading = false;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  },
  methods: {
    getImageUrl(posterPath) {
      if (!posterPath) {
        return 'https://via.placeholder.com/500x750.png?text=No+Poster+Available';
      }
      return `https://image.tmdb.org/t/p/w780${posterPath}`;
    },
    handleMovieClick(movieId) {
      console.log('Clicked movie ID:', movieId);
    },
    favoriteMovie(movieId) {
      const { uid } = useStore(); // Get the Pinia store instance
      const user = uid;
      const db = getFirestore(); // Add this line to access the Firestore instance

      if (user) {
        // User is logged in, add/remove movie from favorites in Firestore
        const favoritesRef = collection(doc(db, 'users', user.uid), 'favorites');
        const index = this.favorites.includes(movieId) ? this.favorites.indexOf(movieId) : -1;
        if (index > -1) {
          // Remove from favorites
          this.favorites.splice(index, 1);
          deleteDoc(doc(favoritesRef, movieId));
        } else {
          // Add to favorites
          this.favorites.push(movieId);
          setDoc(doc(favoritesRef, movieId), { movieId });
        }
      } else {
        // User is not logged in, prompt them to log in
        alert('Please log in to add movies to your favorites.');
      }
    },
    fetchFavoriteMovies(userId, db) {
      const favoritesRef = collection(doc(db, 'users', userId), 'favorites');
      getDocs(favoritesRef)
        .then(querySnapshot => {
          this.favorites = querySnapshot.docs.map(doc => doc.data().movieId);
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }
  }
};
</script>

<style scoped>
.content {
  padding-top: 140px;
}

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
  transition: all 0.3s ease-in-out;
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
