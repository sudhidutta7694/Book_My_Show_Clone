<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-if="loading" class="bg-slate-900 min-h-screen flex justify-center items-center">
      <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading ...">
    </div>
    <div class="bg-slate-900 p-2 pt-20 sm:pt-40 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        class="flex flex-col justify-stretch gap-3 pb-1 items-center bg-slate-700 rounded-xl hover:opacity-70 hover:scale-105 transition-all ease-in duration-300"
        v-for="movie in movies" :key="movie.id" @click="handleMovieClick(movie.id)"
      >
        <div class="relative">
          <router-link :to="{ name: 'overview', params: { id: movie.id } }">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="rounded-lg shadow-lg">
          </router-link>
        </div>
        <div class="text-center">
          <h3 class="text-red-200 text-xl font-serif font-semibold">{{ movie.title }}</h3>
          <p class="text-gray-200 font-mono text-lg">IMDB Rating: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const movies = ref([]);
    const loading = ref(true);
    const page = ref(1); // Track the current page number

    // Fetch popular movies
    async function fetchPopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&page=${page.value}&total_pages=1000`
        );
        const data = await response.json();
        movies.value = [...movies.value, ...data.results];
        loading.value = false;
        console.log(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }

    // Load more movies when the user reaches the bottom of the page
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      if (scrollTop + windowHeight >= documentHeight) {
        page.value++;
        fetchPopularMovies();
      }
    };

    onMounted(() => {
      fetchPopularMovies();
      window.addEventListener('scroll', handleScroll);
    });

    const getImageUrl = (posterPath) => {
      if (!posterPath) {
        return 'https://via.placeholder.com/500x750.png?text=No+Image';
      }
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    };

    const handleMovieClick = (movie) => {
      console.log('Clicked movie:', movie);
    };

    return {
      movies,
      loading,
      getImageUrl,
      handleMovieClick
    };
  },
};
</script>

<style scoped>
.bg-gray-900 {
  background-color: #1a202c;
}

.bg-slate-800 {
  background-color: #4a5568;
}

.bg-slate-700 {
  background-color: #2d3748;
}

.text-red-200 {
  color: #fed7d7;
}

.font-serif {
  font-family: serif;
}

.font-mono {
  font-family: monospace;
}
</style>
